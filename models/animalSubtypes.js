const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSubtypesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  animalType: {
  type: String,
    require: true,
  }
});

module.exports = mongoose.model("AnimalSubtype", animalSubtypesSchema);
