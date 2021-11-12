const Course = require('../models/course')
const coursesController = {}

coursesController.list = (req, res) => {
    let adminId
    if(req.token.role == 'admin' || req.token.role == 'moderator') {
        adminId = req.token._id
    } else {
        adminId = req.token.user
    }
    Course.find({user: adminId})
        .then((courses) => {
            res.json(courses)
        })
        .catch((err) => {
            res.json(err)
        })
}
coursesController.enrolled = (req, res) => {
    Course.find({'students.student' : req.token._id})
        .then((courses) => {
            res.json(courses)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.show = (req, res) => {
    Course.findOneByRole(req)
        .then((course) => {
            if (course) {
                res.json(course)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.create = (req, res) => {
    const body = req.body
    const course = new Course(body)
    course.user = req.token._id
    course.save()
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Course.findByIdAndUpdate({ _id: id, user: req.token._id }, body, { new: true, runValidators: true })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.destroy = (req, res) => {
    const id = req.params.id
    Course.findOneAndDelete({ _id: id,user: req.token._id })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.enroll = (req, res) => {
    Course.findByIdAndEnrollByRole(req) 
        .then((values) => {
            const [course, student] = values
            res.json(course)
        })
        .catch((err) => {
            res.json(err) 
        }) 
}
coursesController.unenroll = (req, res) => {
    Course.findByIdAndUnenroll(req) 
        .then((values) => {
            const [course, student] = values
            res.json(course)
        })
        .catch((err) => {
            res.json(err) 
        }) 
}

module.exports = coursesController