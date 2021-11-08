const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const academySchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    website: {
        type: String
    }
})

module.exports = academySchema