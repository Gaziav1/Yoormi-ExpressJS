const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

router.post("/phoneauth", authController.postPhoneSignUp)
router.post("/phoneverify", authController.postVerifyPhone)

module.exports = router;
