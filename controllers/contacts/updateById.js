const { createError } = require("../../helpers");
const { Contact } = require("../../models/contactModel");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

module.exports = updateById;
