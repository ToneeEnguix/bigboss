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

