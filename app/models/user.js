const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const Schema = mongoose.Schema
const academySchema = require('./academy')

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, 'username is required'], 
        minlength: [4, 'username must be minimum 4 characters long'],
        maxlength: [64, 'username should not be more than 64 characters long'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true, 
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    }, 
    password: {
        type: String, 
        required: [true, 'password is required'],
        minlength: [8, 'password must be minimum 8 characters long'],
        maxlength: [128, 'password should not be more than 128 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'moderator'],
        // default: 'moderator',
        required: [true, "role is required"]
    },
    academy: academySchema
}, { timestamps: true })

userSchema.methods.saveAdmin = function(){
    const currentUser = this  
    return User.findOne({ 'academy.name': currentUser.academy.name })
        .then((user) => {
            if(!user) {
                return bcryptjs.genSalt()
                    .then((salt) => {
                        return bcryptjs.hash(currentUser.password, salt)
                            .then((encrypted) => {
                                currentUser.role = "admin"
                                currentUser.password = encrypted
                                return currentUser.save() 
                            })
                    })      
            } else {
                return Promise.resolve({ notice: 'admin for this academy is already created' })
            }  
        })
}



const User = mongoose.model('User', userSchema)

module.exports = User