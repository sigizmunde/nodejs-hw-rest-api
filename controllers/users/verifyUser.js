const { User } = require("../../models/userModel");
const createError = require("../../helpers/createError");

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true }
  );
  console.log(result);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyUser;
