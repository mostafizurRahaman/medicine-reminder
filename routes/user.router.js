const express = require("express");
const { verifyJWT } = require("../middlewares/verifyJWT.middleware");
const router = express.Router();

router.route("/me").get(verifyJWT, userController.getMe);
router.route("/sign-up").post(userController.createUser);
router.route("/sign-in").post(userController.getLogin);

router.route("/").get(verifyJWT, userController.getAllUsers);

router
   .route("/:id")
   .get(verifyJWT, userController.getUserById)
   .delete(verifyJWT, userController.deleteUserById);

module.exports = router;
