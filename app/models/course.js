const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'course name is required']
    },
    description: {
        type: String,
        required: [true, 'course description is required']
    },
    duration: {
            type: Number,
            required: [true, 'duration is required in months']
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    category: [
        {
            category: {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        }
    ],
    students: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            isCompleted: {
                type: Boolean,
                default: false
            },
            validity: {
                type: Number,
                required: true
            }

        }
    ],
    validity: {
        type: Number, 
        required: [true, 'validity in months required'] 
    },
    level: {
        type: String,
        enum: ['Begginer', 'Intermediate', 'Expert'],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    isDelete: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)

module.exports = Course