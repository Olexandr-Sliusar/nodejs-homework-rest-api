const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  const filters = {};
  if (favorite !== "") {
    filters.favorite = favorite;
  }
  const result = await Contact.find(
    { owner, ...filters },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact id: ${id}- not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact id: ${id}- not found`);
  }
  res.json("Delete success");
};

const updateContactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact id: ${id}- not found`);
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact id: ${id} - not found`);
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
