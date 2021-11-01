const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersController = {}

usersController.register = (req, res) => {
    const body = req.body 
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) =>{ 
            res.json(err)
        })
   
        
    /*
    const user = new User()
    user.username = body.username 
    user.email = body.email
    user.password = body.password
    */
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
                            role: user.role
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
    const id = req.params.id
    const body = req.body
    console.log(body)
    User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}
usersController.list = (req, res) => {

    User.find({ })
    .then((users) => {
        res.json(users)
    })
    .catch((err) => {
        res.json(err)
    })
}

usersController.account = (req, res) => {
    res.json(req.user)
}



module.exports = usersController