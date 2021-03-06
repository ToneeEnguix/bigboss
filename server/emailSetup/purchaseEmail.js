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

const purchaseEmail = (userEmail, purchases) => {
  const email = new Email({
    transport: smtpTrans,
    send: true,
    preview: false,
  });
  let insertText = purchases.map(
    (purchase) =>
      `- Purchased ${purchase.amount} ${purchase.title} for ${purchase.price} `
  );
  try {
    email
      .send({
        message: {
          from: "donotreply@dont.com",
          subject: "Big Boss Purchase Confirmation",
          to: userEmail,
          text: `This Email is here to confirm the following purchase in Big Boss Competitions:
            ${insertText}
            `,
        },
      })
      .then(() => console.log("Email has been sent!"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = purchaseEmail;
