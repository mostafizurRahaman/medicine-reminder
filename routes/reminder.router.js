const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder.controller.js");
router.route("/email").get(reminderController.getReminderByEmail);

router
   .route("/")
   .get(reminderController.getAllReminder)
   .post(reminderController.createReminder);

router
   .route("/:id")
   .get(reminderController.getReminderById)
   .delete(reminderController.deleteReminderById);

module.exports = router;
