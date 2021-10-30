const mongoose = require('mongoose')
const Schema = mongoose.Schema
const authorSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'name is required'], 
        minlength: [4, 'username must be minimum 4 characters long'],
        maxlength: [64, 'username should not be more than 64 characters long'],
        unique: true
    }
}, { timestamps: true })


const Author = mongoose.model('Author', authorSchema)

module.exports = Author