const Student = require('../models/student')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require("lodash")
const studentsController = {}


studentsController.create = (req, res) => {
    const body = req.body 
    const studentObj = new Student(body)
    Student.findOne({ email: studentObj.email, user: req.token._id })
        .then((student) => {
            if(!student) {
                studentObj.user = req.token._id
                studentObj.academyId = req.token.academyId
                studentObj.save()
                    .then((student) => {
                        res.json(_.pick(student, ['_id', 'name', 'email', 'isAllowed', 'courses', 'user', 'createdAt', 'updatedAt', 'role']))
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.json({ errors: "this student email already present"})
            }
        })
        .catch((err) => {
            res.json(err)
        })
    
}

studentsController.login = (req, res,next) => {
    const body = req.body 
    // console.log(req.body)
    Student.findOne({ email: body.email }) 
        .then((student) => {
            if(!student) {
                res.json({ 
                    errors: 'invalid email or password'
                })
            }

           return bcryptjs.compare(body.password, student.password)
                .then((match) => {
                    if(match) {
                        const tokenData = {
                            _id: student._id,
                            email: student.email,
                            name: student.name,
                            role: student.role,
                            user: student.user
                        }                        
                        const token = jwt.sign(tokenData, 'dct123', { expiresIn: '2d'})
                        res.json({
                            token: `${token}`
                        })
                    } else {
                        res.json({ errors: 'invalid email or password'})
                    }
                }).catch(err=>res.send("invalid"))
        }).catch(err=>{
            res.json(err)
        })
}

studentsController.list = (req, res) => {
    Student.find({user: req.token._id })
        .then((students) => {
            res.json(students)
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.show = (req, res) => {
    Student.findByRole(req)
        .then((student) => {
            if (student) {
                res.json(_.pick(student, ['_id', 'name', 'role', 'email', 'courses', 'isAllowed', 'user']))
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.update = (req, res) => {
    Student.findAndUpdateByRole(req) 
        .then((student) => {
            res.json(_.pick(student, ['_id', 'name', 'role', 'email', 'courses', 'isAllowed', 'user']))
        })
        .catch((err) => {
            res.json(err)
        })
}
studentsController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    delete body.password
    delete body.role
    if(req.params.id == req.token._id || req.token.role == 'admin' || req.token.role == 'moderator'){
        Student.findOneAndUpdate({ _id: id, user: req.token.user || req.token._id }, body, { new: true, runValidators: true })
            .then((student) => {
                res.json(_.pick(student, ['_id','name', 'role', 'email','courses','isAllowed','user']))
            })
            .catch((err) => {
                res.json(err)
            })
    }else{
         res.json("Not allowed to update")
    }
}
studentsController.destroy = (req, res) => {
    const id = req.params.id
    Student.findOneAndDelete({ _id: id,user: req.token._id })
        .then((student) => {
            res.json(_.pick(student, ['_id','name', 'role', 'email','courses','isAllowed','user']))
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = studentsController