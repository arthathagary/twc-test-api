const getAllContacts = async (req, res, next) => {
  res.status(200).json({ success: "hello" });
};

const createContact = async (req, res, next) => {
  res.status(200).json({ success: "hello" });
};

const getSingleContact = async (req, res, next) => {};

const updateContact = async (req, res, next) => {};

const deleteContact = async (req, res, next) => {};

module.exports = {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
