const _ = require('lodash');
const disposableEmail = require('rendrr-disposable-email-list');
const parseSmtp = require('parse-smtp-template');
const { applicationId, serverURL } = require('../constants');

const requiredFields = ['username', 'email', 'country', 'lang'];
const achievementsPoints = [5, 10, 25, 50];


const sendSmtpMail = parseSmtp({
  port: process.env.MAIL_PORT || 2525,
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  user: process.env.MAIL_USER || 'f2ef551b118f58',
  password: process.env.MAIL_PASS || 'bdb83c37ee7151',
  fromAddress: process.env.MAIL_FROM || 'e9cf477a87-4a141f@inbox.mailtrap.io',
}).sendMail;


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

function sendMailToUser(user, message, subject) {
  if (user.get('email') && (!user.get('options') || user.get('options').sendEmails !== false)) {
    sendSmtpMail({
      to: user.get('email'),
      text: message,
      subject,
    });
  }
}

function createNotification(user, event) {
  const Notification = Parse.Object.extend('Notification');
  const notification = new Notification();
  notification.set('user', user);
  notification.set('event', event);
  let subject;
  let message;
  switch (event) {
    case '5 Points':
      notification.set('description', 'You have unlocked a new gift');

      subject = 'You have unlocked a new gift';
      message = 'You have unlocked a new gift ';
      break;
  }
  sendMailToUser(user, message, subject);
}

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  if (request.object.isNew() && !request.master) {
    checkRequired(request, requiredFields);
    checkEmail(request);

    request.object.set('points', 0);

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
        createNotification(request.object, `${request.object.get('points')} Points`);
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
    return 'email-sent';
  } catch (e) {
    const errorJson = JSON.parse(e.text);
    throw errorJson.code ? `error-${errorJson.code}` : errorJson.error;
  }
});
