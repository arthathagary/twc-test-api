const Contact = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const contacts = await Contact.find({ userId: userId });
    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return next(new ErrorHandler("Contact Not Found", 404));
    }
    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
