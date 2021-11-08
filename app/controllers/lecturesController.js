const Lecture = require('../models/lecture')
const lecturesController = {}

lecturesController.list = (req, res) => {
    Lecture.find({user: req.token._id })
        .then((lectures) => {
            res.json(lectures)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.show = (req, res) => {
    const id = req.params.id
    Lecture.findOne({ _id: id,user: req.token._id })
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
    lecture.user = req.token._id
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
    Lecture.findOneAndUpdate({ _id: id,user: req.token._id }, body, { new: true, runValidators: true })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.destroy = (req, res) => {
    const id = req.params.id
    Lecture.findOneAndDelete({ _id: id,user: req.token._id })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.comment = (req, res) => {
    const id = req.params.id
    Lecture.findByIdAndUpdate({ _id: id, user: req.token._id }, {
        $push: {
            'comments' : { student : req.token._id, body: req.body.body } // have to write it
        }
    },{ new: true })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}
lecturesController.uncomment = (req, res) => {
    const id = req.params.id
    Lecture.findByIdAndUpdate({ _id: id,user: req.token._id }, {
        $pull: {
            'comments' : { student : req.token._id, _id: req.params.commentId }// check the query
        }
    },{ new: true })
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = lecturesController