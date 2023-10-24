const {
   deleteReminderByEmailService,
} = require("../services/reminder.services");
const {
   FindUserById,
   createUserService,
   FindUserByEmail,
   FindUserByIdService,
   FindUserByEmailService,
   deleteUserByIdService,
} = require("../services/user.service");

exports.signUp = async (req, res, next) => {
   try {
      const user = await createUserService(req.body);
      res.status(200).send({
         status: "success",
         message: "User created user successfully",
         data: user,
      });
   } catch (err) {
      next(err);
   }
};

exports.getUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide a valid Id",
         });
      }
      const user = await FindUserByIdService(id);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't find with this id",
         });
      }
      res.status(200).send({
         status: "success",
         message: "user found successfully",
         data: user,
      });
   } catch (err) {
      next(err);
   }
};

exports.getLogIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      if (!email) {
         return res.status(400).send({
            status: "failed",
            message: "please provide a valid email",
         });
      }
      if (!password) {
         return res.status(400).send({
            status: "failed",
            message: "please provide a password",
         });
      }

      const user = await FindUserByEmailService(email);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't exist with this credential",
         });
      }
      const isValidPassword = user.comparePassword(password, user.password);
      console.log(isValidPassword);

      if (!isValidPassword) {
         return res.status(400).send({
            status: "failed",
            message: "credential didn't matched",
         });
      }

      if (user.status !== "active") {
         return res.status(400).send({
            status: "failed",
            message: "Your account aren't activated yet",
         });
      }

      const accessToken = user.createJWT();
      const { password: pass, ...others } = user.toObject();

      return res.status(200).send({
         status: "success",
         message: "You are loggedIn Successfully",
         data: {
            others,
            accessToken,
         },
      });
   } catch (err) {
      next(err);
   }
};

exports.getMe = async (req, res, next) => {
   try {
      const email = req.user.email;
      const user = await FindUserByEmailService(email);
      if (!user) {
         res.status(400).send({
            status: "failed",
            message: "UnAuthorized User",
         });
      }
   } catch (err) {
      next(err);
   }
};

exports.deleteUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide a valid Id",
         });
      }
      const user = await FindUserByIdService(id);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't find with this id",
         });
      }
      const email = user.email;
      const result = await deleteUserByIdService(id);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't delete with this id",
         });
      }

      //  delete all reminder of the user :
      const reminderDeleteResult = await deleteReminderByEmailService(email);
      res.status(200).send({
         status: "success",
         message: "user deleted successfully",
         data: { result, reminderDeleteResult },
      });
   } catch (err) {
      next(err);
   }
};
