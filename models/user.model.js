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
            values: ["admin", "patient"],
            message: "{VALUE} shouldn't be role",
         },
         required: [true, "please provide valid role"],
      },
      status: {
         type: String,
         enum: {
            values: ["active", "in-active"],
            message: `{VALUE} shouldn't be status`,
         },
         default: "active",
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre("save", function (next) {
   this.password = bcrypt.hashSync(this.password, 10);
   next();
});

userSchema.methods.comparePassword = (password, hash) => {
   return bcrypt.compareSync(password, hash);
};

userSchema.methods.createJWT = function () {
   const payload = { email: this.email, role: this.role };
   const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
   });
   return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
