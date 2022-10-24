const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/userModel");

const { createError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 12);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
