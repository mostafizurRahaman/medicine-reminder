const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder.controller.js");

router
   .route("/")
   .get(reminderController.getAllReminder)
   .post(reminderController.createReminder);

module.exports = router;
