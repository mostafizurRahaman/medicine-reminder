const Reminder = require("../models/riminder.model");

exports.getAllReminderServices = async () => {
   const reminders = await Reminder.find({});
   return reminders;
};

exports.createReminderService = async (data) => {
   const reminder = new Reminder(data);
   const result = reminder.save();
   return result;
};

exports.deleteReminderByEmailService = async (email) => {
   const result = await Reminder.deleteMany({ email });
   return result;
};
