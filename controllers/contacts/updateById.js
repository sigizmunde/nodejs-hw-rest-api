const { createError } = require("../../helpers");
const { Contact } = require("../../models/contactModel");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const body = req.query;
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  // the {new: true} option returns updated object

  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

module.exports = updateById;
