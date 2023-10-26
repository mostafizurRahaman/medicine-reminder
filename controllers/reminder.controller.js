const {
   createReminderService,
   getAllReminderServices,
   getReminderByEmailService,
   getReminderByIdService,
   deleteReminderByIdService,
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

exports.getReminderById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide a an id",
         });
      }
      const reminder = await getReminderByIdService(id);
      if (!reminder) {
         return res.status(400).send({
            status: "failed",
            message: "reminder didn't find by this id",
         });
      }
      res.status(200).send({
         status: "success",
         message: "Reminder found successfully",
         data: reminder,
      });
   } catch (err) {
      next(err);
   }
};

exports.getReminderByEmail = async (req, res, next) => {
   try {
      const { email } = req.query;
      if (!email) {
         return res.status(200).send({
            status: "failed",
            message: "Please provide a email address",
         });
      }
      
      const reminder = await getReminderByEmailService(email);
      res.status(200).send({
         status: "success",
         message: "Reminder Found successfully",
         data: reminder,
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

exports.deleteReminderById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide a an id",
         });
      }
      const reminder = await getReminderByIdService(id);
      if (!reminder) {
         return res.status(400).send({
            status: "failed",
            message: "reminder didn't find by this id",
         });
      }

      const result = await deleteReminderByIdService(id);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Reminder didn't deleted with this id ",
         });
      }

      res.status(200).send({
         status: "success",
         message: "Reminder Deleted successfully",
         data: result,
      });
   } catch (err) {
      next(err);
   }
};
