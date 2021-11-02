const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const Schema = mongoose.Schema
const studentSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'name is required'], 
        minlength: [4, 'name must be minimum 4 characters long'],
        maxlength: [64, 'name should not be more than 64 characters long'],
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
    courses: [
        {
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course'
            }
        }
    ],
    isAllowed: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'student'
    }
}, { timestamps: true })


studentSchema.pre('save', function(next){
    const student = this
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(student.password, salt)
                .then((encrypted) => {
                    student.password = encrypted
                    next()
                })
        })  
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student