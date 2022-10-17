const { User } = require("../../models/userModel");

const setSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({ email, subscription });
};

module.exports = setSubscription;
