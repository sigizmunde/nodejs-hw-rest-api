require("dotenv").config();
const { BASE_URL } = process.env;

const createEmailTemplate = (email, verificationToken) => {
  const link = `${BASE_URL}/api/users/verify/${verificationToken}`;
  return {
    to: email,
    subject: "Verify email",
    html: `<p>Please, do not reply on this letter. This message is sent to you to verify your attempt to register on contact service.</p><p><a target="_blank" href="${link}">Click to verify your email</a></p><br/><p>${link}</p>`,
  };
};

module.exports = createEmailTemplate;
