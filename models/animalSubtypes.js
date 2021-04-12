const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSubtypesSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    dropDups: true
  },
  animalType: {
    type: String,
    require: true,
  },
  createdByUser: { 
    type: Schema.Types.ObjectId,
    required: false
  }
});

module.exports = mongoose.model("AnimalSubtype", animalSubtypesSchema);
