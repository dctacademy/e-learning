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
        res.status(401).json(e.message)
    }
}

const authorizeUser = ( req, res, next) => {
    const { url, method, token } = req
    const canCreate = 'POST', canRead = 'GET', canUpdate = 'PUT', canDestroy = 'DELETE'
    const all = [canCreate, canRead, canUpdate, canDestroy]
    
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
    authenticateUser, authorizeUser
}