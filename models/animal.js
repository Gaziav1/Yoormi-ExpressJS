const mongoose = require("mongoose")
const Schema = mongoose.Schema

const animalSchema = new Schema({ 
    name: { 
        type: String,
        required: true
    },
    animalType: { 
        type: String, 
        required: true
    },
    age: { 
        type: Number, 
        required: true
    },
    isMale: { 
        type: Boolean, 
        required: true
    },
    animaleSubtype: { 
        type: String,
        required: true
    },
    imageURLs: { 
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("Animal", animalSchema);