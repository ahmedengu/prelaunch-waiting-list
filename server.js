const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const { ParseServer } = require('parse-server');
const http = require('http');
const { CronJob } = require('cron');
const Honeybadger = require('honeybadger').configure({
  apiKey: '9c499114',
});

const port = process.env.PORT || 4000;
const ParseDashboard = require('parse-dashboard');
const { emailConfig } = require('./serverConstants');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.MAIL_SECURE || 0;

const api = new ParseServer({
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || `${__dirname}/cloud/main.js`,
  appId: process.env.APP_ID || 'xxxxx',
  masterKey: process.env.MASTER_KEY || 'xxxxx', // Add your master key here. Keep it secret!
  javascriptKey: process.env.JAVASCRIPT_KEY || 'xxxxx',
  clientKey: process.env.CLIENT_KEY || 'xxxxx',
  serverURL: process.env.SERVER_URL || `http://localhost:${port}/api`, // Don't forget to change to https if needed
  logLevel: 'VERBOSE',
  allowClientClassCreation: true,
  verifyUserEmails: true,
  emailVerifyTokenValidityDuration: 48 * 60 * 60, // in seconds (2 hours = 7200 seconds)
  preventLoginWithUnverifiedEmail: false, // defaults to false
  publicServerURL: process.env.PUBLIC_URL || 'http://localhost:3000',
  appName: process.env.APP_NAME || 'MerQuant',
  liveQuery: {
    classNames: ['_User'],
  },
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000,
  sessionLength: 3110400000,
  protectedFields: {
    _User: {
      '*': ['email', 'token', 'username', 'objectId'],
    },
  },
  emailAdapter: {
    module: 'parse-smtp-template-text',
    options: emailConfig,
  },
  customPages: {
    parseFrameURL: process.env.PUBLIC_URL || 'http://localhost:3000',
  },
  auth: {
    facebook: {
      appIds: '403863870540210',
    },
    google: {
      appIds: '449870039809-vernaus5vu13rmqga2rf6t9lpofm9nuf.apps.googleusercontent.com',
    },
  },
});


const dashboard = new ParseDashboard({
  allowInsecureHTTP: true,
  apps: [
    {
      serverURL: process.env.SERVER_URL || `http://localhost:${port}/api`,
      appId: process.env.APP_ID || 'xxxxx',
      masterKey: process.env.MASTER_KEY || 'xxxxx',
      javascriptKey: process.env.JAVASCRIPT_KEY || 'xxxxx',
      appName: process.env.APP_NAME || 'MerQuant',
    },
  ],
  users: [
    {
      user: process.env.DASHBOARD_USER || 'x',
      pass: process.env.DASHBOARD_PASS || 'x',
    },
  ],
}, {
  allowInsecureHTTP: true,
});

(async () => {
  const server = express();
  server.set('trust proxy', true);
  server.use(Honeybadger.requestHandler);
  server.use(process.env.PARSE_MOUNT || '/api', api);
  server.use(process.env.DASHBOARD_MOUNT || '/dashboard', dashboard);
  server.use(Honeybadger.errorHandler);
  server.post('/webhooks/github_push', (req, res) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      if (data.includes('refs/heads/prod')) {
        const signature = `sha1=${crypto
          .createHmac(
            'sha1',
            'jsdngjsdSDFSDF%$^$%^dfhdf%^&^%567567%^&%^fhfgh-dfhwrqrtyuadavGHG45645FGDF635SDGSD',
          )
          .update(data)
          .digest('hex')}`;
        const isAllowed = req.headers['x-hub-signature'] === signature;
        const body = JSON.parse(data);
        const isMaster = body.ref === 'refs/heads/prod';
        const directory = {
          'ahmedengu/merquant_prelunch': '/srv/deploy',
        }[(body.repository.full_name) || ''];
        if (isAllowed && isMaster && directory) {
          try {
            fs.writeFileSync('/srv/deploy/current/deployMe', 'w');
            return res.send('success');
          } catch (error) {
            console.log(error);
            return res.send('failed');
          }
        }
      }
      return res.redirect('https://merquant.com');
    });
  });
  server.get('*', (req, res) => res.redirect('https://merquant.com'));
  const httpServer = http.createServer(server);

  await httpServer.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  ParseServer.createLiveQueryServer(httpServer);
})();

const aCron = new CronJob('0 0 * * *', (async () => {
  await Parse.Cloud.startJob('sendStatus');
}), null, true, 'Atlantic/Azores');
