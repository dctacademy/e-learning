const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require("lodash")
const usersController = {}

usersController.register = (req, res) => {
    const body = req.body 
    const user = new User(body)
    const { academy } = body 
    if(!academy.name.trim()) {
        res.json({ 
            errors: 'academy name is required'
        })
    } else {
        user.saveAdmin()
            .then((user) => {
                res.json(user)
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
            }

            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if(match) {
                        const tokenData = {
                            _id: user._id,
                            email: user.email,
                            username: user.username,
                            role: user.role,
                            academyId: user.academy._id
                        }
                        const token = jwt.sign(tokenData, 'dct123', { expiresIn: '2d'})
                        res.json({
                            token: `${token}`
                        })
                    } else {
                        res.json({ errors: 'invalid email or password'})
                    }
                })
        })
}
usersController.update = (req, res) => {
    const id = req.token._id
    const body = req.body
    delete body.password
    delete body.role
   
    User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then((user) => {
            res.json(_.pick(user, ['username', 'email','academy']))
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
               res.json(_.pick(user, ['username', 'role', 'email','academy']))
            }
        })
        .catch((err) => {
            res.json(err)
        })
}



module.exports = usersController