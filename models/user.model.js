const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Schema.Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, "please provide a user name"],
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         validate: [validator.isEmail, "please provide a valid email"],
         required: [true, "please provide an email"],
      },
      password: {
         type: String,
         trim: true,
         validate: {
            validator: (value) =>
               validator.isStrongPassword(value, {
                  minLength: 6,
                  minLowercase: 1,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
               }),
         },
      },
      role: {
         type: String,
         enum: {
            values: ["admin", "patient", "careTaker"],
            message: "{VALUE} shouldn't be role",
         },
      },
      reminders: [
         {
            type: ObjectId,
            ref: "Reminder",
            required: true,
         },
      ],
      status: {
         type: String,
         enum: {
            values: ["active", "in-active"],
            message: `{VALUE} shouldn't be status`,
         },
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre("save", function (next) {
   this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = (password, hash) => {
   return bcrypt.compareSync(password, hash);
};

userSchema.methods.createJWT = () => {
   const payload = { email: this.email, role: this.role };
   const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
   });
   return accessToken;
};

module.exports = User;
