const Author = require('../models/author')
const authorsController = {}

authorsController.list = (req, res) => {
    Author.find({ user: req.token._id })
        .then((authors) => {
            res.json(authors)
        })
        .catch((err) => {
            res.json(err)
        })
}

authorsController.show = (req, res) => {
    const id = req.params.id
    Author.findOne({ _id: id, user: req.token._id  })
        .then((author) => {
            if (author) {
                res.json(author)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

authorsController.create = (req, res) => {
    const body = req.body
    const author = new Author(body)
    author.user = req.token._id 
    author.save()
        .then((author) => {
            res.json(author)
        })
        .catch((err) => {
            res.json(err)
        })
}

authorsController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Author.findOneAndUpdate({ _id: id, user: req.token._id }, body, { new: true, runValidators: true })
        .then((author) => {
            res.json(author)
        })
        .catch((err) => {
            res.json(err)
        })
}

authorsController.destory = (req, res) => {
    const id = req.params.id
    Author.findOneAndDelete({ _id: id, user: req.token._id })
        .then((author) => {
            res.json(author)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = authorsController