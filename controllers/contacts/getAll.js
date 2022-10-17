const { Contact } = require("../../models/contactModel");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const searchQuery = favorite ? { owner, favorite } : { owner };
  const data = await Contact.find(searchQuery, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.status(200).json(data);
};

module.exports = getAll;
