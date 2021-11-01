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
router.get('/authors/:id', authorsController.show)
router.put('/authors/:id', authenticateUser,authorizeUser, authorsController.update)
router.delete('/authors/:id', authenticateUser, authorsController.destory)

router.get('/categories', categoriesController.list)
router.post('/categories', authenticateUser,authorizeUser, categoriesController.create)
router.get('/categories/:id', categoriesController.show)
router.put('/categories/:id', authenticateUser,authorizeUser, categoriesController.update)
router.delete('/categories/:id', authenticateUser,authorizeUser, categoriesController.destory)

router.post('/students/register', studentsController.register)
router.post('/students/login', studentsController.login)
router.get('/students',authenticateUser, studentsController.list)
router.post('/students', studentsController.create)
router.get('/students/:id',authenticateStudent, studentsController.show)
router.put('/students/:id',authenticateStudent, studentsController.update)
router.delete('/students/:id', authenticateUser, studentsController.destory)

router.get('/courses', coursesController.list)
router.post('/courses', authenticateUser, coursesController.create)
router.get('/courses/:id', coursesController.show)
router.put('/courses/:id', authenticateUser,authorizeUser, coursesController.update)
router.delete('/courses/:id', authenticateUser, coursesController.destory)

router.get('/courses/:courseId/lectures', lecturesController.list)
router.post('/courses/:courseId/lectures', authenticateUser, lecturesController.create)
router.get('/courses/:courseId/lectures/:id', lecturesController.show)
router.put('/courses/:courseId/lectures/:id', authenticateUser,authorizeUser, lecturesController.update)
router.delete('/courses/:courseId/lectures/:id', authenticateUser,authorizeUser, lecturesController.destory)

module.exports = router