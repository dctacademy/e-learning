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
    category: {
                type: Schema.Types.ObjectId,
                ref: 'Category'
        },
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
            enrollment: {
                type: Date,
                default: Date.now
            },
            validity: {
                type: Number,
                default: 6
            }

        }
    ],
    validity: {
        type: Number, 
        default: 12,
        required: [true, 'validity in months required'] 
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'],
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

courseSchema.statics.findAllByRole = function(req){
    const Course = this 
    if(req.token.role == 'admin' || req.token.role == 'moderator') {
        return Course.find({})
    } else {
        return Course.find({ 'students.student' : req.token._id })
    }
}

courseSchema.statics.findOneByRole = function(req){
    const Course = this 
    if(req.token.role ? 'admin' : 'moderator') {
        return Course.findOne({ _id: req.params.id })
    } else { 
        return Course.findOne({ 'students.student' : req.token._id , _id: req.params.id})
    }
}   

courseSchema.statics.findByIdAndUpdateByRole = function(req){
    const id = req.params.id 
    const body = req.body 
    const Course = this 
    if(req.token.role? 'admin' : 'moderator') { 
        return Course.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
    } else {
        return Course.findOneAndUpdate({ _id: id, 'students.student' : req.token._id}, body, { new: true, runValidators: true })
    }
}

courseSchema.statics.findByIdAndEnrollByRole = function(req){
    const Course = this 
    if(req.token.role? 'admin' : 'moderator') {
        return Course.findOneAndUpdate({
            _id: req.query.courseId 
        }, { 
            $push: { 
                'students.student' : req.query.studentId
            }
        })
    } else { 
        return Course.findOneAndUpdate({
            _id: req.query.courseId
        }, {
            $push: {
                'students.student' : req.token._id
            }
        })
    }

}

const Course = mongoose.model('Course', courseSchema)

module.exports = Course