const User = require("../models/user.model");

exports.createUserService = async (data) => {
   const user = new User(data);
   const result = await user.save();
   return result;
};

exports.FindUserByEmailService = async (email) => {
   const user = await User.findOne({ email });
   return user;
};

exports.FindUserByIdService = async (id) => {
   const user = await User.findById(id);
   return user;
};

exports.deleteUserByIdService = async (id) => {
   const result = await User.deleteOne({ _id: id });
   console.log(result);
   return result;
};
