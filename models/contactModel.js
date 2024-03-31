const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please Enter Contact Name!"],
    trim: true,
    maxlenght: [100, "Contact name cannot exceed 100 charactors"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Contact Email!"],
    trim: true,
    maxlenght: [100, "Contact email cannot exceed 100 charactors"],
  },
  phonenumber: {
    type: String,
    required: [true, "Please Enter phone number!"],
    trim: true,
    maxlenght: [12, "Contact phone number cannot exceed 12 charactors"],
  },
  gender: {
    type: String,
    required: [true, "Please Enter contact person gender"],
    enum: {
      values: ["male", "female"],
      message: "Please select correct gender",
    },
  },
  userId: {
    type: String,
    required: [true, "Please insert userId"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("Contact", contactSchema);

module.exports = schema;
