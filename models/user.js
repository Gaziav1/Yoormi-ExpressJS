const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: { 
        type: String,
        required: false,
        default: null
    },
    phone: { 
        type: String, 
        required: true,
        unique: true
    },
    image: { 
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userSchema)