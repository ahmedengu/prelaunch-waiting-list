const express = require('express');
const { ParseServer } = require('parse-server');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const http = require('http');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const { CronJob } = require('cron');
const Parse = require('parse');
const ParseDashboard = require('parse-dashboard');
const nextI18next = require('./i18n');

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
  publicServerURL: process.env.SERVER_URL || `http://localhost:${port}/api`,
  appName: process.env.APP_NAME || 'MerQuant',
  liveQuery: {
    classNames: ['_User'],
  },
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000,
  sessionLength: 3110400000,
  protectedFields: [],
  auth: {
    facebook: {
      appIds: '1394780183887567',
    },
  },
  emailAdapter: {
    module: 'parse-smtp-template',
    options: {
      port: 1025,
      host: 'localhost',
      user: 'name@domain.com',
      password: 'SecurePassword',
      fromAddress: 'app@domain.com',
      multiTemplate: true,
      multiLang: true,
      confirmTemplatePath: 'views/templates/confirmTemplate.html',
      multiLangConfirm: {
        es: {
          subject: 'Confirmación de Correo',
          body: 'Cuerpo del correo de confirmación de correo',
          btn: 'confirma tu correo',
        },
        en: {
          subject: 'E-mail confirmation',
          body: 'Mail confirmation email body',
          btn: 'confirm your email',
        },
        fr: {
          subject: 'Mail de confirmation',
          body: 'Courriel de confirmation du corps de l\'e-mail',
          btn: 'confirmez votre email',
        },
      },
      confirmOptions: {
        subject: 'E-mail confirmation',
        body: 'Custome email confirmation body',
        btn: 'confirm your email',
      },
    },
  },
  customPages: {
    passwordResetSuccess: 'http://yourapp.com/passwordResetSuccess',
    verifyEmailSuccess: 'http://yourapp.com/verifyEmailSuccess',
    parseFrameURL: 'http://yourapp.com/parseFrameURL',
    linkSendSuccess: 'http://yourapp.com/linkSendSuccess',
    linkSendFail: 'http://yourapp.com/linkSendFail',
    invalidLink: 'http://yourapp.com/invalidLink',
    invalidVerificationLink: 'http://yourapp.com/invalidVerificationLink',
    choosePassword: 'http://yourapp.com/choosePassword',
  },

});


const dashboard = new ParseDashboard({
  allowInsecureHTTP: true,
  apps: [{
    serverURL: process.env.SERVER_URL || `http://localhost:${port}/api`,
    appId: process.env.APP_ID || 'xxxxx',
    masterKey: process.env.MASTER_KEY || 'xxxxx',
    javascriptKey: process.env.JAVASCRIPT_KEY || 'xxxxx',
    appName: process.env.APP_NAME || 'MerQuant',
  }],
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
  await app.prepare();
  const server = express();

  server.use(process.env.PARSE_MOUNT || '/api', api);
  server.use(process.env.DASHBOARD_MOUNT || '/dashboard', dashboard);
  server.use(nextI18NextMiddleware(nextI18next));

  server.get('*', (req, res) => handle(req, res));

  const httpServer = http.createServer(server);

  await httpServer.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  ParseServer.createLiveQueryServer(httpServer);
})();

const aCron = new CronJob('0 17 * * *', (() => {
  // Parse.Cloud.httpRequest({
  //   method: 'POST',
  //   url: 'http://178.62.95.208:1337/parse/jobs/push',
  //   headers: {
  //     'X-Parse-Application-Id': 'xxxxx',
  //     'X-Parse-Master-Key': 'xxxxx',
  //   },
  // }).then((httpResponse) => {
  //   console.log(httpResponse.text);
  // }, (httpResponse) => {
  //   console.error(`Request failed with response code ${httpResponse.status}`);
  // });
}), null, true, 'Atlantic/Azores');
