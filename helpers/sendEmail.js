const sendgridMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "notify-bot@meta.ua" };
  await sendgridMail.send(mail);
  return true;
};

module.exports = sendEmail;
