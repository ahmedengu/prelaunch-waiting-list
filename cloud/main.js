const disposableEmail = require('rendrr-disposable-email-list');

const padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3) : number);

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  if (request.object.isNew()) {
    const email = request.object.get('email');
    const emailCheck = disposableEmail.isDisposable(email);

    if (!emailCheck.isEmail || emailCheck.isDisposable || !emailCheck.isWebmail) {
      throw 'invalid-email';
    }

    const query = new Parse.Query(Parse.User);
    const prefix = email.replace('@', '').replace('.', '').slice(0, 5);
    const count = await query.startsWith('ref', prefix).count({ useMasterKey: true });

    request.object.set('ref', `${prefix}${padToThree(count + 1)}`);
  }
});


Parse.Cloud.afterSave(Parse.User, async (request) => {
  const referred = request.object.get('referred');
  if (referred && !request.object.existed()) {
    const query = new Parse.Query(Parse.User);
    const users = await query.equalTo('ref', referred)
      .find({ useMasterKey: true });
    if (users && users[0]) {
      users[0].increment('referrals');
      await users[0].save(null, { useMasterKey: true });
    }
  }
});
