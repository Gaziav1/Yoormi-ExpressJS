const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      ref: "Animal",
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    address: {
      required: false,
      lat: { 
        type: String
      },
      long: { 
        type: String
      }
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
