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
        subject: 'Confirmación de Correo',
        body: {
          body: 'Cuerpo del correo de confirmación de correo',
          body1: 'Mail confirmation email body1',
          footer1: 'Mail confirmation email body1',
          footer2: 'Mail confirmation email body1',
          link: process.env.PUBLIC_URL || 'http://localhost:3000',
          achv_body: 'Cuerpo del correo de confirmación de correo',
          achv_body1: 'Mail confirmation email body1',
          achv_body2: 'Cuerpo del correo de confirmación de correo',
          achv_body3: 'Mail confirmation email body1',
        },
        btn: {
          btn: 'confirma tu correo',
          achv_btn: 'confirma tu correo',
          achv_btn1: 'confirma tu correo',
        },
      },
    },
    confirmOptions: {
      subject: 'Confirmación de Correo',
      body: {
        body: 'Cuerpo del correo de confirmación de correo',
        body1: 'Mail confirmation email body1',
        footer1: 'Mail confirmation email body1',
        footer2: 'Mail confirmation email body1',
        link: process.env.PUBLIC_URL || 'http://localhost:3000',
        achv_body: 'Cuerpo del correo de confirmación de correo',
        achv_body1: 'Mail confirmation email body1',
        achv_body2: 'Cuerpo del correo de confirmación de correo',
        achv_body3: 'Mail confirmation email body1',
      },
      btn: {
        btn: 'confirma tu correo',
        achv_btn: 'confirma tu correo',
        achv_btn1: 'confirma tu correo',
      },
    },
    passwordOptions: {},
  },
};
