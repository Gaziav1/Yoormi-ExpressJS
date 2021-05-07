const express = require("express");
const adCreationController = require("../controllers/adCreationController");

const router = express.Router();

router.post("/createAd", adCreationController.postSaveAnimalAndAd)
router.get("", adCreationController.getAds);


module.exports = router