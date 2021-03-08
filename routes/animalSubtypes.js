const animalSubTypesController = require("../controllers/animalSubTypesController")
const express = require("express")
const router = express.Router()

router.get("/animalSubtypes", animalSubTypesController.getAnimalSubtypes)

module.exports = router