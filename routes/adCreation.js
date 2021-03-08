const express = require("express");
const adCreationController = require("../controllers/adCreationController");

const router = express.Router();

router.post("/createAd", adCreationController.postSaveAnimalAndAd)


module.exports = router