const router = require("express").Router();
const userController = require('../controllers/user');

router.route("/signup").post(userController.signUpUser);
router.route("/signin").post(userController.signInUser);
router.route("/refresh-token").post(userController.signInUser);

module.exports = router;