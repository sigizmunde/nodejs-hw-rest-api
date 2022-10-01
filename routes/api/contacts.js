const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (_, res) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
});

router.post("/", async (req, res) => {
  const body = req.query;
  const contact = await addContact(body);
  res.json(contact);
});

router.delete("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  res.json(contact);
});

router.put("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const body = req.query;
  const contact = await updateContact(id, body);
  res.json(contact);
});

module.exports = router;
