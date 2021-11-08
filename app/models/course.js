const mongoose = require('mongoose')
const Student = require('./student')
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
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }

}, { timestamps: true })

courseSchema.statics.findAllByRole = function(req){
    const Course = this 
    if(req.token.role == 'admin' || req.token.role == 'moderator') {
        return Course.find({user: req.token._id})
    } else {
        return Course.find({ user : req.token.user })
    }
}

courseSchema.statics.findOneByRole = function(req){
    const Course = this 
    if(req.token.role ? 'admin' : 'moderator') {
        return Course.findOne({ _id: req.params.id, user: req.token._id })
    } else { 
        return Course.findOne({ 'students.student': req.token._id, _id: req.params.id, user: req.token.user})// check
    }
}   

courseSchema.statics.findByIdAndUpdateByRole = function(req){
    const id = req.params.id 
    const body = req.body 
    const Course = this 
    if(req.token.role? 'admin' : 'moderator') { 
        return Course.findOneAndUpdate({ _id: id, user: req.token._id }, body, { new: true, runValidators: true })
    } else {
        return Course.findOneAndUpdate({ _id: id, 'students.student': req.token._id, user: req.token.user}, body, { new: true, runValidators: true })
    }
}

courseSchema.statics.findByIdAndEnrollByRole = function(req, res){
    const Course = this 
    if(req.token.role == 'admin' || req.token.role == 'moderator') {
        return Course.findOne({ 'students.student': req.query.studentId, user: req.token.user })
            .then((course) => {
                if(course) {
                    return Promise.reject("Already enrolled")
                } else {
                    return Promise.all([Course.findByIdAndUpdate(req.query.courseId, {
                        $push: {
                            'students' : { student: req.query.studentId }
                        }
                    },{ new: true }), Student.findByIdAndUpdate(req.query.studentId, {
                        $push: {
                            'courses' : { course: req.query.courseId}
                        }
                    },{ new: true })]) 
                }
            })
    } else { 
        return Course.findOne({ 'students.student': req.token._id, user: req.token.user })
            .then((course) => {
                if(course) {
                    return Promise.reject("Already enrolled")
                } else {
                    return Promise.all([Course.findByIdAndUpdate(req.query.courseId, {
                        $push: {
                            'students' : { student: req.token._id }
                        }
                    },{ new: true }), Student.findByIdAndUpdate(req.token._id, {
                        $push: {
                            'courses' : { course: req.query.courseId}
                        }
                    },{ new: true })]) 
                }
            })
    }
}
courseSchema.statics.findByIdAndUnenroll = function(req, res){
    const Course = this 
    if(req.token.role == 'admin' || req.token.role == 'moderator') {
        return Course.findOne({ 'students.student': req.query.studentId, user: req.token._id})
            .then((course) => {
                if(course) {
                    return Promsie.all([Course.findByIdAndUpdate(req.query.courseId, {
                        $pull: {
                            'students' : { student : req.query.studentId }
                        }
                    },{ new: true })], Student.findByIdAndUpdate(req.query.studentId, { $pull: { 'courses' : { course: req.query.courseId } }},{ new: true }) )
                }else{
                    return Promise.reject("Already unenrolled")
                }
            })
    } else { 
        return Course.findOne({ 'students.student': req.token._id, user: req.token.user })
            .then((course) => {
                if(course) {
                    return Promise.all([Course.findByIdAndUpdate(req.query.courseId, {
                        $pull: {
                            'students' : { student: req.token._id }
                        }
                    },{ new: true }), Student.findByIdAndUpdate(req.token._id, {
                        $pull: {
                            'courses' : { course: req.query.courseId}
                        }
                    },{ new: true })]) 
                }else{
                    return Promise.reject("Already unenrolled")
                }
            })
    }
}

const Course = mongoose.model('Course', courseSchema)

module.exports = Course