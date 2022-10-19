const jwt = require("jsonwebtoken");

const { createError } = require("../helpers");

const { User } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const authenticateViaToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(createError(401, "Not authorized"));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      next(createError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(3);
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authenticateViaToken;
