const nodemailer = require("nodemailer");
const config = require("./emailConfig.js");
const Email = require("email-templates");

const smtpTrans = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.password,
  },
});

const welcomeEmail = (userEmail) => {
  const email = new Email({
    transport: smtpTrans,
    send: true,
    preview: false,
  });

  console.log(email);
  // Attempt to send the email
  try {
    email
      .send({
        message: {
          from: "donotreply@dont.com",
          subject: "Big Boss Account Creation Confirmation",
          to: userEmail,
          text:
            "This Email is here to Confirm your account has been sucessfully created at Big Boss Competitions.",
        },
      })
      .then(() => console.log("Email has been sent!"));
  } catch (error) {
    console.error(error);
  }
};

const resetPasswordEmail = (data, userEmail) => {
  const resetLink = `https://bigbosscompetitions.com/resetpass/${data._id}/${data.token}`;
  const email = new Email({
    transport: smtpTrans,
    send: true,
    preview: false,
  });
  // Attempt to send the email
  try {
    email
      .send({
        template: "resetPassword",
        message: {
          from: "Big Boss Password Reset",
          to: userEmail,
        },
        locals: {
          link: resetLink,
        },
      })
      .then(() => console.log("Email has been sent!"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = resetPasswordEmail;
module.exports = welcomeEmail;
