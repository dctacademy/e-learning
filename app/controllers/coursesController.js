const Course = require('../models/course')
const coursesController = {}

coursesController.list = (req, res) => {
    Author.find({})
        .then((courses) => {
            res.json(courses)
        })
        .catch((err) => {
            res.json(err)
        })
}

coursesController.show = (req, res) => {
    const id = req.params.id
    Author.findOne({ _id: id })
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
    const id = req.params.id
    const body = req.body
    Course.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
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

module.exports = coursesController