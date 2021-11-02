const mongoose = require('mongoose')
const isURL = require('validator/lib/isURL')
const Schema = mongoose.Schema


const lectureSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    assetType: {
            type: String,
            enum: ['video', 'audio', 'text', 'pdf', 'img'],
            required: [true, 'type of the file is required']
    },
    assetURL: {
        type: String,
        required: true, 
        validate: {
            validator: function(value){ 
                return isURL(value)
            },
            message: function(){
                return 'invalid URL format ( sample - http://www.dct.com/media/js.img )'
            }
        }
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
    course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
    },
    isDelete: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Lecture = mongoose.model('Lecture', lectureSchema)

module.exports = Lecture