const mongoose = require("mongoose");
const validator = require("validator");

const reminderSchema = mongoose.Schema(
   {
      medicineName: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, "please provide a medicine name"],
      },
      userName: {
         type: String,
         required: [true, "please provide your name"],
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         validate: [validator.isEmail, "please provide a valid email"],
         required: [true, "please provide an email"],
      },
      dosage: {
         type: Number,
         min: [1, "min dosage will be 1"],
         validate: {
            validator: (value) => Number.isInteger(value),
            message: "Please provide a valid number",
         },
         required: [true, "please provide a number"],
      },

      frequency: {
         type: String,
         enum: {
            values: ["daily", "weekly", "monthly"],
         },
         required: true,
      },
      phone: {
         type: String,
         validate: [validator.isMobilePhone, "Please provide a valid number"],
      },

      careTaker: {
         name: {
            type: String,
         },
         phone: {
            type: String,
            validate: [
               validator.isMobilePhone,
               "Please provide a valid phone number",
            ],
         },
      },
      medicineTakingsDays: [
         {
            type: String,
            enums: ["sun", "mon", "tue", "wed", "thu", "sat", "fri"],
         },
      ],
      reminderStartDate: {
         type: Date,
         required: [true, "please provide a date & time"],
      },
      remindAt: {
         type: String,
         validate: {
            validator: (value) =>
               validator.isTime(value, {
                  hourFormat: "hour24",
               }),
         },
         required: [true, "please provide a reminder time"],
      },
      reminderEndDate: {
         type: Date,
         required: [true, "please provide a date"],
      },
      status: {
         type: String,
         enum: {
            values: ["active", "in-active"],
            message: "{VALUE} shouldn't be status",
         },
      },
   },
   {
      timestamps: true,
   }
);

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
