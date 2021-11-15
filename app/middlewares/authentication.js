const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'dct123')
        // console.log('token data',tokenData)
        req.token = tokenData 
        next()
    } catch(e) {
        res.status(401).json({ errors: e.message})
    }
}

const authorizeUser = ( req, res, next) => {
    const { url, method, token } = req
    const canCreate = 'POST', canRead = 'GET', canUpdate = 'PUT', canDestroy = 'DELETE', canUpdateSpecific = 'PATCH'
    const all = [canCreate, canRead, canUpdate, canDestroy, canUpdateSpecific]
    
    const roles = {
        admin: {
            models: {
                course: all,
                lecture: all,
                student: all
            }
        },
        moderator: {
            models: {
                course: [canRead, canUpdate],
                lecture: [canRead, canUpdate],
                student: [canCreate, canRead, canUpdate]
            }
        },
        student: {
            models: {
                course: [canRead, canUpdateSpecific],
                lecture: [canRead,canUpdateSpecific],
                student: [ canRead, canUpdate, canUpdateSpecific]
            }
        }

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

    if(url.includes('/courses')) {
        grantAccess('course')
    } else if(url.includes('/lectures')) {
        grantAccess('lecture')
    } else if(url.includes('/students')) {
        grantAccess('student')
    }    
}


module.exports = {
    authenticateUser, authorizeUser
}