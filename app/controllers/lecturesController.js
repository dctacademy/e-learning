const Lecture = require('../models/lecture')
const lecturesController = {}

lecturesController.list = (req, res) => {
    Lecture.find({course: req.params.id })
        .then((lectures) => {
            res.json(lectures)
        })
        .catch((err) => {
            res.json(err)
        })
}

lecturesController.show = (req, res) => {
    const id = req.params.id
    Lecture.findOne({ _id: id,user: req.token.user || req.token._id  })
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
    delete body.students
    delete body.comments
    const lecture = new Lecture(body)
    lecture.course = req.params.id
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
    delete body.students
    delete body.comments
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
    Lecture.findByIdAndUpdate({ _id: id, user: req.token.user }, {
        $push: {
            'comments' : { student : req.token._id,body: req.body.body}
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
    if(req.token.role === 'admin' || req.token.role === 'moderator'){
        Lecture.findByIdAndUpdate({ _id: id }, {
            $pull: {
                'comments' : { _id: req.params.commentId }
            }
        },{ new: true })
            .then((lecture) => {
                res.json(lecture)
            })
            .catch((err) => {
                res.json(err)
            })
    }else{
        Lecture.findByIdAndUpdate({ _id: id }, {
            $pull: {
                'comments' : { student : req.token._id, _id: req.params.commentId }
            }
        },{ new: true })
            .then((lecture) => {
                res.json(lecture)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    
}
lecturesController.markAsComplete = (req, res) => {
    Lecture.markAsComplete(req) 
        .then((lecture) => {
            res.json(lecture)
        })
        .catch((err) => {
            res.json(err) 
        }) 
}

module.exports = lecturesController