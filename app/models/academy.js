const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const academySchema = new Schema({
    name: {
        type: String,
    },
    website: {
        type: String
    }
})

module.exports = academySchema