const nodemailer = require('nodemailer');
const config = require("./emailConfig.js")
const Email = require('email-templates');

const resetPasswordEmail = (data,userEmail) => {


  const resetLink = `localhost:3000/resetpass/${data._id}/${data.token}`

  const smtpTrans = nodemailer.createTransport({
 service:"gmail",
    auth: {
      user: config.user,
      pass: config.password
    }
  })

  const email = new Email({
    transport: smtpTrans,
    send: true,
    preview: false,

  });

  // Attempt to send the email

  try {
    email.send({
      template: 'resetPassword',
      message: {
        from: 'Big Boss Password Reset',
        to: userEmail,
      },
      locals: {
        link: resetLink
      },
    }).then(() => console.log('email has been sent!'));
  }
  catch (error) {

    console.log(error)
  }
}

module.exports = resetPasswordEmail;
