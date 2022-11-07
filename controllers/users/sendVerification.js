const { User } = require("../../models/userModel");

const { sendEmail } = require("../../helpers");
const createEmailTemplate = require("../../helpers/createEmailTemplate");

const sendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "No user with this email" });
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
  }
  const mail = createEmailTemplate(email, user.verificationToken);
  sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = sendVerification;
