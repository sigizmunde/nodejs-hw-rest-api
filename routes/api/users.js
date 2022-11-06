const { userJoiSchemas } = require("../../models/userModel");
const { registerSchema, loginSchema, subscriptionSchema } = userJoiSchemas;

const express = require("express");
const router = express.Router();

const ctrlUsers = require("../../controllers/users");
const controlWrapper = require("../../helpers/controlWrapper");
const validate = require("../../middleware/validate");
const authenticateViaToken = require("../../middleware/authenticateViaToken");
const uploadFile = require("../../middleware/uploadFile");

router.post(
  "/signup",
  validate(registerSchema),
  controlWrapper(ctrlUsers.register)
);

router.post("/login", validate(loginSchema), controlWrapper(ctrlUsers.login));

router.get("/logout", authenticateViaToken, controlWrapper(ctrlUsers.logout));

router.get(
  "/current",
  authenticateViaToken,
  controlWrapper(ctrlUsers.getCurrent)
);

router.patch(
  "/subscription",
  authenticateViaToken,
  validate(subscriptionSchema),
  controlWrapper(ctrlUsers.setSubscription)
);

router.patch(
  "/avatars",
  authenticateViaToken,
  uploadFile.single("avatar"),
  controlWrapper(ctrlUsers.updateAvatar)
);

router.get("/verify/:verificationToken", controlWrapper(ctrlUsers.verifyUser));

router.post("/verify/", controlWrapper(ctrlUsers.sendVerification));

module.exports = router;
