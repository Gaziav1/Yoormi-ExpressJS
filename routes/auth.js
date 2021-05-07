const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/phoneauth", authController.postPhoneSignUp)
router.post("/phoneverify", authController.postVerifyPhone)
router.post("/createProfile", authController.postSaveImageAndName)

module.exports = router;
