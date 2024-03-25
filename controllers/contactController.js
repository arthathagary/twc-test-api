const Contact = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
};

const createContact = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    contact,
  });
};

const getSingleContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new ErrorHandler("Contact Not Found", 404));
  }
  res.status(201).json({
    success: true,
    contact,
  });
};

const updateContact = async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact Not Found",
    });
  }
  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(201).json({
    success: true,
    contact,
  });
};

const deleteContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact Not Found",
    });
  }
  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact Deleted",
  });
};

module.exports = {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
