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
  try {
    console.log("apple", smtpTrans, userEmail);
    const email = new Email({
      transport: smtpTrans,
      send: true,
      preview: false,
    });
    email
      .send({
        message: {
          from: "donotreply@dont.com",
          subject: "Big Boss Account Creation Confirmation",
          to: userEmail,
          text:
            "This Email is here to confirm your account has been sucessfully created at Big Boss Competitions.",
        },
      })
      .then(() => console.log("Email has been sent!"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = welcomeEmail;
