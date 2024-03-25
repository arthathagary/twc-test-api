const express = require("express");
const {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/contacts").get().post();
router.route("/contacts/:id").get().put().delete();

module.exports = router;
