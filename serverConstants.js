module.exports = {
  emailConfig: {
    port: process.env.MAIL_PORT || 2525,
    host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    user: process.env.MAIL_USER || 'f2ef551b118f58',
    password: process.env.MAIL_PASS || 'bdb83c37ee7151',
    fromAddress: process.env.MAIL_FROM || 'e9cf477a87-4a141f@inbox.mailtrap.io',
    multiTemplate: true,
    multiLang: true,
    confirmTemplatePath: 'views/templates/confirmTemplate.html',
    multiLangConfirm: {
      ar: {
        subject: 'MerQuant Email Confirmation',
        achv_subject: 'Congrats you have earned free stocks from MerQuant',
        body: {
          body: 'Welcome to MerQuant',
          body1: 'Use the button below to confirm that we have your correct email.',
          footer1: 'Free shares are acquired after the validation of referred account and the official of MerQuant.',
          footer2: 'The regulations and registration of MerQuant are still in progress.',
          link: process.env.PUBLIC_URL || 'http://localhost:3000',
          achv_body: 'achv_body',
          achv_body0: 'achv_body0',
          achv_body1: 'achv_body1',
        },
        btn: {
          btn: 'Confirm Email',
          achv_btn: 'Share Referral Link',
          achv_btn1: 'Track Your Progress',
        },
      },
    },
    confirmOptions: {
      subject: 'MerQuant Email Confirmation',
      achv_subject: 'Congrats, you have earned free stocks from MerQuant',
      body: {
        body: 'Welcome to MerQuant',
        body1: 'Use the button below to confirm that we have your correct email.',
        footer1: 'Free shares are acquired after the validation of referred account and the official of MerQuant.',
        footer2: 'The regulations and registration of MerQuant are still in progress.',
        link: process.env.PUBLIC_URL || 'http://localhost:3000',
        achv_body: 'You have earned',
        achv_body0: 'Stocks',
        achv_body1: 'Keep it up, use the buttons below to login and keep on sharing.',
      },
      btn: {
        btn: 'Confirm Email',
        achv_btn: 'Share Referral Link',
        achv_btn1: 'Track Your Progress',
      },
    },
    passwordOptions: {},
  },
};
