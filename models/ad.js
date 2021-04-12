const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false
    },
    isReadyForSale: { 
      type: Boolean, 
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
