const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactSchema,
  updateContactSchema,
} = require("../../schemas/contactSchemas");

const createError = require("http-errors");
const express = require("express");
const router = express.Router();

router.get("/", async (_, res) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    next(createError(404, "Contact not found"));
    return;
  }
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const body = req.query;
  const { error } = addContactSchema.validate(body);
  if (error) {
    next(createError(400, "Bad request"));
    return;
  }
  const contact = await addContact(body);
  res.json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  if (!contact) {
    next(createError(404, "Contact not found"));
    return;
  }
  res.json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.query;
  const { error } = updateContactSchema.validate({ id, ...body });
  if (error) {
    next(createError(400, "Bad request"));
    return;
  }
  const contact = await updateContact(id, body);
  res.json(contact);
});

module.exports = router;
