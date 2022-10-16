const { userJoiSchemas } = require("../../models/userModel");
const { registerSchema, loginSchema } = userJoiSchemas;

const express = require("express");
const router = express.Router();

const ctrlUsers = require("../../controllers/users");
const controlWrapper = require("../../helpers/controlWrapper");
const validate = require("../../middleware/validate");

router.post(
  "/signup",
  validate(registerSchema),
  controlWrapper(ctrlUsers.register)
);

router.post("/login", validate(loginSchema), controlWrapper(ctrlUsers.login));

module.exports = router;
