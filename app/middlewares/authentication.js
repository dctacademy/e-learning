const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Student = require('../models/student')
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'dct123')
        User.findById(tokenData._id)
            .then((user) => {
                req.user = user 
                req.token = tokenData
                next()
            })
            .catch((err) => {
                res.status(401).json(err)
            })
        // req.token = tokenData
       
    } catch(e) {
        res.status(401).json(e.message)
    }
}
const authenticateStudent = (req, res, next) => {
    const token = req.header('Authorization')
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'dct123')
        // console.log('token data', tokenData)
        Student.findById(tokenData._id)
            .then((student) => {
                req.student = student 
                next()
            })
            .catch((err) => {
                res.status(401).json(err)
            })
        // req.token = tokenData
       
    } catch(e) {
        res.status(401).json(e.message)
    }
}


const authorizeUser = ( req, res, next) => {
    const { url, method, token } = req
    console.log('token', token)
    const all = ['POST', 'GET', 'PUT', 'DELETE']
    const canCreate = 'POST', canRead = 'GET', canUpdate = 'PUT', canDestroy = 'DELETE'
    const roles = {
        admin: {
            models: {
                author: all ,
                category: all,
                course: all,
                lecture: all,
                student: all
            }
        },
        moderator: {
            models: {
                author: [canCreate, canRead, canUpdate],
                category: [canCreate, canRead, canUpdate],
                course: [canRead, canUpdate],
                lecture: [canRead, canUpdate],
                student: [canCreate, canRead, canUpdate]
            }
        },
        student: {
            models: {
                author: ['GET'],
                category: ['GET'],
                course: ['GET'],
                lecture: ['GET'],
                student: ['POST', 'GET', 'PUT']
            }
        }
        // author : {
        //     POST: ['admin', 'moderator'],
        //     GET: ['admin', 'moderator','student'],
        //     PUT: ['admin', 'moderator'],
        //     DELETE: ['admin']
        // }, 
        // category: {
        //     POST: ['admin', 'moderator'],
        //     GET: ['admin', 'moderator', 'student'],
        //     PUT: ['admin', 'moderator'],
        //     DELETE: ['admin']
        // },
        // course: {
        //     POST: ['admin'],
        //     GET: ['admin', 'moderator', 'student'],
        //     PUT: ['admin', 'moderator'],
        //     DELETE: ['admin']
        // },
        // lecture: {
        //     POST: ['admin'],
        //     GET: ['admin', 'moderator', 'student'],
        //     PUT: ['admin', 'moderator'],
        //     DELETE: ['admin']
        // },
        // student: {
        //     POST: ['admin', 'moderator', 'student'],
        //     GET: ['admin', 'moderator', 'student'],
        //     PUT: ['admin', 'moderator', 'student'],
        //     DELETE: ['admin']
        // }
    }

    const grantAccess = (modelName) => {
        if (roles[token.role].models[modelName].includes(method)) {
                next()
            } else {
                res.status(401).json({
                    notice: 'Unauthorized'
                })
            }
    }

    if(url.includes('/authors')) { 
        grantAccess('author')
    } else if(url.includes('/categories')) {
        grantAccess('category')
    } else if(url.includes('/courses')) {
        grantAccess('course')
    } else if(url.includes('/lectures')) {
        grantAccess('lecture')
    } else if(url.includes('/students')) {
        grantAccess('student')
    }    
}


module.exports = {
    authenticateUser, authorizeUser, authenticateStudent
}