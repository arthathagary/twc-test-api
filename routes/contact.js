const express = require("express");
const {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/contacts").post(createContact);
router
  .route("/contacts/:id")
  .get(getAllContacts)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
