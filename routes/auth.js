const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/user");
const authCheck = require("../middleware/is-auth")

const router = express.Router();

router.post("/phoneauth", authController.postPhoneSignUp)
router.post("/phoneverify", authController.postVerifyPhone)
router.post("/createProfile", authController.postSaveImageAndName)

module.exports = router;
