const Lecture = require('../models/lecture')
const lecturesController = {}

lecturesController.list = (req, res) => {
    Lecture.find({ })
        .then((lectures) => {
            res.json(lectures)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.show = (req, res) => {
    const id = req.params.id
    Lecture.findOne({ _id: id })
        .then((lecture) => {
            if (lecture) {
                res.json(lecture)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.create = (req, res) => {
    const body = req.body
    const lecture = new Lecture(body)
    lecture.save()
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Lecture.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.destory = (req, res) => {
    const id = req.params.id
    Lecture.findOneAndDelete({ _id: id })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = lecturesController