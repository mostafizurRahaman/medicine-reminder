const express = require("express");
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/verifyJWT.middleware");
const router = express.Router();

router.route("/me").get(verifyJWT, userController.getMe);
router.route("/sign-up").post(userController.signUp);
router.route("/sign-in").post(userController.getLogIn);

// router.route("/").get(verifyJWT, userController.get);

router
   .route("/:id")
   .get(verifyJWT, userController.getUserById)
   .delete(verifyJWT, userController.deleteUserById);

module.exports = router;
