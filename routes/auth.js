const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, req) => {
        User.findOne({ email: email }).then((user) => {
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

module.exports = router;
