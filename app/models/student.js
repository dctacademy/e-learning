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
    },
    email: {
        type: String,
        required: [true, 'email is required'],
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
        required: true, 
        default: true
    },
    role: {
        type: String,
        required: true, 
        default: 'student'
    },
    user: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
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

studentSchema.statics.findByRole = function(req){
    const Student = this 
    const id = req.params.id 
    if(req.token.role === 'admin') {
        return Student.findOne({ _id: id, user: req.token._id})
    } else {
        return Student.findById({ _id: req.token._id, user: req.token.user })
    }
}


const Student = mongoose.model('Student', studentSchema)

module.exports = Student