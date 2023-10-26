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

exports.getReminderByEmailService = async (email) => {
   const reminders = await Reminder.find({ email });
   return reminders;
};

exports.getReminderByIdService = async (id) => {
   const result = await Reminder.findById(id);
   return result;
};

exports.deleteReminderByIdService = async (id) => {
   const result = await Reminder.deleteOne({ _id: id });
};
exports.deleteReminderByEmailService = async (email) => {
   const result = await Reminder.deleteMany({ email });
   return result;
};
