const express = require("express");
const adCreationController = require("../controllers/adCreationController");

const router = express.Router();

router.post("/createAd", adCreationController.saveAnimalAndAd)

module.exports = router