const Course = require('../models/course')
const coursesController = {}

coursesController.list = (req, res) => {
    Course.findAllByRole(req)
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
    course.save()
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.update = (req, res) => {
    Course.findByIdAndUpdateByRole(req)
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.destory = (req, res) => {
    const id = req.params.id
    Course.findOneAndDelete({ _id: id })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.enroll = (req, res) => {
    const id = req.query.id 
    Course.findByIdAndEnrollByRole(req)
    
    
}

module.exports = coursesController