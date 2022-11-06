const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const setSubscription = require("./setSubscription");
const updateAvatar = require("./updateAvatar");
const verifyUser = require("./verifyUser");
const sendVerification = require("./sendVerification");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  setSubscription,
  updateAvatar,
  verifyUser,
  sendVerification,
};
