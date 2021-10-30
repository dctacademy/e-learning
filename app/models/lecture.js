const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    typeOf: {
            type: String,
            required: [true, 'type of the file is required']
    },
    assetURL: {
        type: String,
        required: true
    },
    comments: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            body: {
                type: String,
                required: true
            },
            isApproved: {
                type: Boolean,
                default: false
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
            }

        }
    ],
    isDelete: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)

module.exports = Course