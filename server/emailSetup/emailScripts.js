const nodemailer = require('nodemailer');
const config = require("./emailConfig.js")
const Email = require('email-templates');

const smtpTrans = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.password
  }
})

const welcomeEmail = (userEmail) => {

  const email = new Email({
    transport: smtpTrans,
    send: true,
    preview: false,

  });

  // Attempt to send the email

  try {
    email.send({

      message: {
        from: 'donotreply@dont.com',
        subject:"Big Boss Account Creation Confirmation",
        to: userEmail,
        text:"This Email is here to Confirm your account has been sucessfully created at Big Boss Competitions."
      },
   
    }).then(() => console.log('email has been sent!'));
  }
  catch (error) {

    console.log(error)
  }
}

const resetPasswordEmail = (data, userEmail) => {


  const resetLink = `localhost:3000/resetpass/${data._id}/${data.token}`

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
module.exports= welcomeEmail
