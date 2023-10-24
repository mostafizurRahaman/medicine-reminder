const {
   createReminderService,
   getAllReminderServices,
} = require("../services/reminder.services");

exports.getAllReminder = async (req, res, next) => {
   try {
      const reminders = await getAllReminderServices();
      res.status(200).send({
         status: "success",
         message: "Reminder found successfully",
         data: reminders,
      });
   } catch (err) {
      next(err);
   }
};

exports.createReminder = async (req, res, next) => {
   try {
      if (!req.body) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide reminder data",
         });
      }
      const reminder = await createReminderService(req.body);
      res.status(200).send({
         status: "success",
         message: "Reminder Created successfully",
         data: reminder,
      });
   } catch (err) {
      next(err);
   }
};
