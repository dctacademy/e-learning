const express = require('express')
const router = express.Router() 
const { authenticateUser, authorizeUser,authenticateStudent } = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/usersController')
const categoriesController = require('../app/controllers/categoriesController')
const authorsController = require('../app/controllers/authorsController')
const studentsController = require('../app/controllers/studentsController')
const coursesController = require('../app/controllers/coursesController')
const lecturesController = require('../app/controllers/lecturesController')


router.post('/admin/users/register', usersController.register)
router.post('/admin/users/login', usersController.login)
router.get('/admin/users/account', authenticateUser, usersController.account)
router.put('/admin/users/:id', authenticateUser, usersController.update)

router.get('/authors', authenticateUser, authorizeUser, authorsController.list)
router.post('/authors', authenticateUser,authorizeUser, authorsController.create)
router.get('/authors/:id', authenticateUser, authorizeUser, authorsController.show)
router.put('/authors/:id', authenticateUser, authorizeUser, authorsController.update)
router.delete('/authors/:id', authenticateUser, authorizeUser, authorsController.destory)

router.get('/categories', authenticateUser, authorizeUser, categoriesController.list)
router.post('/categories', authenticateUser, authorizeUser,  categoriesController.create)
router.get('/categories/:id', authenticateUser, authorizeUser,  categoriesController.show)
router.put('/categories/:id', authenticateUser,authorizeUser, categoriesController.update)
router.delete('/categories/:id', authenticateUser,authorizeUser, categoriesController.destory)

router.post('/students/register', studentsController.register)
router.post('/students/login', studentsController.login)
router.get('/students', authenticateUser, authorizeUser, studentsController.list)
router.post('/students', authenticateUser, authorizeUser, studentsController.create)
router.get('/students/:id',authenticateUser, authorizeUser,  studentsController.show)
router.put('/students/:id', authenticateUser, authorizeUser,  studentsController.update)
router.delete('/students/:id', authenticateUser, authorizeUser,  studentsController.destory)

router.get('/courses', authenticateUser, authorizeUser, coursesController.list)
router.post('/courses', authenticateUser, authorizeUser,  coursesController.create)
router.get('/courses/:id', authenticateUser, authorizeUser, coursesController.show)
router.put('/courses/:id', authenticateUser, authorizeUser, coursesController.update)
router.delete('/courses/:id', authenticateUser, authorizeUser,  coursesController.destory)

router.get('/courses/:courseId/lectures', authenticateUser, authorizeUser,  lecturesController.list)
router.post('/courses/:courseId/lectures', authenticateUser, authorizeUser,  lecturesController.create)
router.get('/courses/:courseId/lectures/:id', authenticateUser, authorizeUser, lecturesController.show)
router.put('/courses/:courseId/lectures/:id', authenticateUser, authorizeUser,  lecturesController.update)
router.delete('/courses/:courseId/lectures/:id', authenticateUser,authorizeUser, lecturesController.destory)

module.exports = router