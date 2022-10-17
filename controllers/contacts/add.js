const { Contact } = require("../../models/contactModel");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const body = req.body;
  body.favorite = !!body.favorite; // sets favorite to false if there is no value
  const contact = await Contact.create({ ...body, owner });
  res.status(201).json(contact);
};

module.exports = add;
