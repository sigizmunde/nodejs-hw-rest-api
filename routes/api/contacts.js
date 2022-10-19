const { contactJoiSchemas } = require("../../models/contactModel");
const { addContactSchema, updateContactSchema, favorContactSchema } =
  contactJoiSchemas;

const express = require("express");
const router = express.Router();

const ctrlContacts = require("../../controllers/contacts");
const controlWrapper = require("../../helpers/controlWrapper");
const validate = require("../../middleware/validate");
const authenticateViaToken = require("../../middleware/authenticateViaToken");

router.get("/", authenticateViaToken, controlWrapper(ctrlContacts.getAll));

router.get(
  "/:contactId",
  authenticateViaToken,
  controlWrapper(ctrlContacts.getById)
);

router.post(
  "/",
  authenticateViaToken,
  validate(addContactSchema),
  controlWrapper(ctrlContacts.add)
);

router.delete(
  "/:contactId",
  authenticateViaToken,
  controlWrapper(ctrlContacts.removeById)
);

router.patch(
  "/:contactId/favorite",
  authenticateViaToken,
  validate(favorContactSchema),
  controlWrapper(ctrlContacts.updateStatusContact)
);

router.put(
  "/:contactId",
  authenticateViaToken,
  validate(updateContactSchema),
  controlWrapper(ctrlContacts.updateById)
);

module.exports = router;
