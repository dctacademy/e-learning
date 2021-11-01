const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Student = require('../models/student')
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    console.log('req',req)
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'dct123')
        User.findById(tokenData._id)
            .then((user) => {
                req.user = user 
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
    // CREATE / DELETE - Admin 
    // EDIT - ADMIN / Moder
    // READ - 

    // authors
    

    // courses

    // 
    if(req.method === 'post' || req.method === 'delete') { 
    if(tokenData.role === 'admin' )        
        next() 
    else if(req.method === 'put' || tokenData.role === 'moderator'){
        next()
    }else
        res.status(401).json({ notice: 'unauthorized '})
    }


}


module.exports = {
    authenticateUser, authorizeUser, authenticateStudent
}