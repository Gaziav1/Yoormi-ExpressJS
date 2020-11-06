const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

router.post("/phoneAuth", authController.postPhoneSignUp)
router.post("/phoneVerify", authController.postVerifyPhone)

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, req) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-Mail already exists");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.postSignup
);

router.post(
  "/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, req) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("E-Mail does not match any existing user");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 })
  ],
  authController.postSignIn
);

module.exports = router;
