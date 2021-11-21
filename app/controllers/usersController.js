const User = require('../models/user')
const _ = require("lodash")
const usersController = {}

usersController.register = (req, res) => {
    const body = req.body 
    const userObj = new User(body)
    const { academy } = body 
    if(!academy.name.trim()) {
        res.json({ 
            errors: 'academy name is required'
        })
    } else {
        User.findOne({ 'academy.name' : academy.name, email: userObj.email })
            .then((user) => {
                if(user) {
                    res.json({ errors: 'admin for this academy is already created' })
                } else {
                    userObj.save()
                    .then((user) => {
                        res.status(201).json({
                            notice: `Successfully created admin for ${user.academy.name}`
                        })
                    }).catch(err => {
                        res.status(406).json({notice: "try with different email"})
                    })
                }
            })
            .catch((err) => {
                res.json(err) 
            })
    }
}

usersController.login = (req, res) => {
    const body = req.body 
    User.findOne({ email: body.email }) 
        .then((user) => {
            if(!user) {
                res.json({ 
                    errors: 'invalid email or password'
                })
            } else {
                return user.generateToken(body.password)
            }
        })
        .then((token) => {
            res.json(token)
        })
        .catch((err) => {
            res.json(err) 
        })
}

usersController.update = (req, res) => {
    const id = req.token._id
    const body = req.body
    delete body.password
    delete body.role
   
    User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then((user) => {
            res.json(_.pick(user, ['_id', 'username', 'email','academy', 'role']))
        })
        .catch((err) => {
            res.json(err)
        })
}
usersController.list = (req, res) => {
    User.find({ 'academy._id': req.token.academyId})
    .then((users) => {
        res.json(users)
    })
    .catch((err) => {
        res.json(err)
    })
}

usersController.account = (req, res) => {
    User.findById({ _id: req.token._id }) 
        .then((user) => {
            if(!user) {
                res.json({})
            } else {
               res.json(_.pick(user, ['_id','username', 'role', 'email','academy']))
            }
        })
        .catch((err) => {
            res.json(err)
        })
}



module.exports = usersController