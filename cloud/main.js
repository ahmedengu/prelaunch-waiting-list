const _ = require('lodash');
const disposableEmail = require('rendrr-disposable-email-list');
const parseSmtp = require('parse-smtp-template');
const qs = require('qs');
const uuid = require('uuid');
const cache = require('memory-cache');
const { applicationId, serverURL } = require('../constants');
const { emailConfig } = require('../serverConstants');

const requiredFields = ['username', 'email', 'country', 'lang'];
const achievementsPoints = [
  5,
  10,
  25,
  50,
  100,
  250,
  500,
  1000,
  2000,
  5000,
  10000,
  25000,
  50000,
  100000,
];

function checkRequired(request, fields) {
  const missing = [];
  _.forEach(fields, (field) => {
    if (!request.object.get(field)) {
      missing.push(field);
    }
  });

  if (!_.isEmpty(missing)) {
    throw `${missing.join(', ')} required`;
  }
}

function checkEmail(request) {
  const email = request.object.get('email');
  const emailCheck = disposableEmail.isDisposable(email);

  if (!emailCheck.isEmail) {
    throw 'invalid-email';
  }
  if (emailCheck.isDisposable) {
    throw 'disposable-email';
  }
  if (!emailCheck.isWebmail) {
    throw 'not-webmail-email';
  }
}

async function assignRef(request) {
  const query = new Parse.Query(Parse.User);
  const prefix = request.object.get('email')
    .replace('@', '')
    .replace('.', '')
    .slice(0, 5);

  const user = await query.startsWith('ref', prefix)
    .descending('createdAt')
    .first({ useMasterKey: true });

  let count = 0;
  if (user) {
    count = parseInt(user.get('ref')
      .replace(prefix, ''), 10);
  }

  request.object.set('ref', `${prefix}${count + 1}`);
}

function sendAchievementMail(user, data) {
  if (user.get('email') && (!user.get('options') || user.get('options').sendEmails !== false)) {
    const mailOptions = {
      ..._.cloneDeep(emailConfig),
      confirmTemplatePath: 'views/templates/achievement.html',
    };
    mailOptions.multiLangConfirm.ar.subject = mailOptions.multiLangConfirm.ar.achv_subject;
    mailOptions.confirmOptions.subject = mailOptions.confirmOptions.achv_subject;

    const sendSmtpMail = parseSmtp(mailOptions).sendVerificationEmail;

    sendSmtpMail({
      ...data,
      user,
    }).then(() => {
      user.set('lastMailSent', new Date());
      user.save(null, { useMasterKey: true });
    });
  }
}

function createNotification(user, event, data) {
  const Notification = Parse.Object.extend('Notification');
  const notification = new Notification();
  notification.set('user', user);
  notification.set('event', event);
  notification.set('description', `You have earned ${event}`);
  notification.save(null, { useMasterKey: true });
  sendAchievementMail(user, data);
}

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  if (request.object.isNew() && !request.master) {
    checkRequired(request, requiredFields);
    checkEmail(request);

    request.object.set('points', 0);
    request.object.set('token', uuid.v4());

    await assignRef(request);

    if (request.object.get('referred') === request.object.get('ref')) {
      request.object.set('invalidReferred', request.object.get('referred'));
      request.object.unset('referred');
    }
  } else if (!request.master && !(request.object.dirtyKeys()
    && request.object.dirtyKeys().length === 1
    && request.object.dirtyKeys()[0] === 'lang')) {
    throw 'not-allowed';
  }
});

Parse.Cloud.afterSave(Parse.User, async (request) => {
  const referred = request.object.get('referred');
  if (request.master) {
    if (request.object.existed()) {
      if (request.object.get('emailVerified') && !request.original.get('emailVerified') && referred) {
        const query = new Parse.Query(Parse.User);
        const user = await query.equalTo('ref', referred)
          .first({ useMasterKey: true });
        if (user && user.get('pendingPoints') > 0) {
          user.increment('pendingPoints', -1);
          user.increment('points');
          await user.save(null, { useMasterKey: true });
        }
      } else if (request.original.get('points') < request.object.get('points')
        && achievementsPoints.includes(request.object.get('points'))) {
        createNotification(
          request.object,
          `${request.object.get('points')} Shares`,
          { points: request.object.get('points') },
        );
      }
    }
  } else if (referred && !request.object.existed()) {
    const query = new Parse.Query(Parse.User);
    const user = await query.equalTo('ref', referred)
      .first({ useMasterKey: true });
    if (user) {
      user.increment('pendingPoints');
      await user.save(null, { useMasterKey: true });
      request.object.set('points', 1);
    } else {
      request.object.set('invalidReferred', request.object.get('referred'));
      request.object.unset('referred');
    }
    request.object.save(null, { useMasterKey: true });
  }
});


Parse.Cloud.define('resendVerification', async (request, response) => {
  const { email } = request.params;

  if (!email || !disposableEmail.isDisposable(email).isEmail) {
    throw 'invalid-email';
  }

  const cacheKey = `resendVerification_${email}`;
  const trials = cache.get(cacheKey) || 0;

  if (trials > 3) {
    throw 'send-limit';
  }

  try {
    await Parse.Cloud.httpRequest({
      method: 'POST',
      url: `${serverURL}/verificationEmailRequest`,
      headers: {
        'x-parse-application-id': applicationId,
        'x-parse-master-key': process.env.MASTER_KEY || 'xxxxx',
      },
      body: { email },
    });

    cache.put(cacheKey, trials + 1, 1000 * 60 * 60 * 24);

    return 'email-sent';
  } catch (e) {
    const errorJson = JSON.parse(e.text);
    throw errorJson.code ? `error-${errorJson.code}` : errorJson.error;
  }
});

Parse.Cloud.define('verifyEmail', async (request, response) => {
  const { token, username } = request.params;

  if (!token || !username) {
    throw 'invalid-request';
  }

  try {
    await Parse.Cloud.httpRequest({
      method: 'GET',
      url: `${serverURL}/apps/${applicationId}/verify_email?${qs.stringify({ token, username })}`,
      headers: {
        'x-parse-application-id': applicationId,
        'x-parse-master-key': process.env.MASTER_KEY || 'xxxxx',
      },
    });

    const query = new Parse.Query(Parse.User);
    const user = await query.equalTo('username', username)
      .first({ useMasterKey: true });

    if (user) {
      user.set('emailVerified', true);
      user.save(null, { useMasterKey: true });
    }

    return 'verified';
  } catch (e) {
    const errorJson = JSON.parse(e.text);
    throw errorJson.code ? `error-${errorJson.code}` : errorJson.error;
  }
});

Parse.Cloud.define('manageSub', async (request, response) => {
  const { token, username, sendEmails } = request.params;

  if (!token || !username) {
    throw 'invalid-request';
  }
  const query = new Parse.Query(Parse.User);

  const user = await query.equalTo('username', username)
    .equalTo('token', token)
    .first({ useMasterKey: true });

  if (user && user.get('token') === token && user.get('username') === username) {
    user.set('sendEmails', sendEmails === true);
    user.save(null, { useMasterKey: true });
    return 'successful';
  }

  throw 'not-found';
});
