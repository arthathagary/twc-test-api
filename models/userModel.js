const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Contact Email!"],
    unique: true,
    trim: true,
    maxlenght: [100, "Contact email cannot exceed 100 charactors"],
  },
  password: {
    type: String,
    required: [true, "Please Enter phone number!"],
    trim: true,
  },
  token: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("User", userSchema);

module.exports = schema;
