const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: options.to,
    from: `${options.name} <${options.email}>`,
    subject: options.subject,
    html: `
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin:0;padding:0;font-family:'HelveticaNeueLight','HelveticaNeue-Light','HelveticaNeueLight','HelveticaNeue','HelveticaNeue',Helvetica,Arial,'LucidaGrande',sans-serif;font-weight:300;font-stretch:normal;font-size:14px;">
      <div>
        <p>${options.message}</p>
      </div>
    </body>
    `,
  };
  await sgMail.send(msg);
};

module.exports = sendEmail;
