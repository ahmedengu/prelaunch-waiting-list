const _ = require('lodash');
const disposableEmail = require('rendrr-disposable-email-list');

const requiredFields = ['username', 'email', 'country', 'lang'];

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

  const users = await query.startsWith('ref', prefix)
    .descending('createdAt')
    .limit(1)
    .find({ useMasterKey: true });

  let count = 0;
  if (users && users[0]) {
    count = parseInt(users[0].get('ref').replace(prefix, ''), 10);
  }

  request.object.set('ref', `${prefix}${count + 1}`);
}

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  if (request.object.isNew() && !request.master) {
    checkRequired(request, requiredFields);
    checkEmail(request);

    request.object.set('referrals', 0);

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
  if (referred && !request.object.existed() && !request.master) {
    const query = new Parse.Query(Parse.User);
    const users = await query.equalTo('ref', referred)
      .find({ useMasterKey: true });
    if (users && users[0] && users[0].get('country') === request.object.get('country')) {
      users[0].increment('referrals');
      await users[0].save(null, { useMasterKey: true });
    } else {
      request.object.set('invalidReferred', request.object.get('referred'));
      request.object.unset('referred');
      request.object.save(null, { useMasterKey: true });
    }
  }
});
