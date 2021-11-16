const express = require('express')
const router = express.Router() 
const { authenticateUser, authorizeUser } = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/usersController')
const studentsController = require('../app/controllers/studentsController')
const coursesController = require('../app/controllers/coursesController')
const lecturesController = require('../app/controllers/lecturesController')


router.post('/admin/register', usersController.register)
router.post('/admin/login', usersController.login)
// router.get('/admin/users',authenticateUser, usersController.list)
router.get('/admin/account', authenticateUser, usersController.account)
router.put('/admin/update', authenticateUser, usersController.update)

router.post('/admin/students', authenticateUser, authorizeUser, studentsController.create)
router.get('/admin/students', authenticateUser, authorizeUser, studentsController.list)
router.delete('/admin/students/:id', authenticateUser, authorizeUser, studentsController.destroy)
router.post('/students/login', studentsController.login)
router.get('/students/:id',authenticateUser, authorizeUser,  studentsController.show)
router.put('/students/:id', authenticateUser, authorizeUser,  studentsController.update)

router.get('/courses', authenticateUser, authorizeUser, coursesController.list)
router.get('/courses/enrolled', authenticateUser, authorizeUser, coursesController.enrolled)
router.post('/courses', authenticateUser, authorizeUser,  coursesController.create)
router.get('/courses/:id', authenticateUser, authorizeUser, coursesController.show)
router.put('/courses/:id', authenticateUser, authorizeUser, coursesController.update)
router.delete('/courses/:id', authenticateUser, authorizeUser,  coursesController.destroy)
router.patch('/courses/enroll', authenticateUser, authorizeUser, coursesController.enroll )
router.patch('/courses/unenroll', authenticateUser, authorizeUser, coursesController.unenroll )

router.get('/courses/:courseId/lectures', authenticateUser, authorizeUser,  lecturesController.list)
router.post('/courses/:courseId/lectures', authenticateUser, authorizeUser,  lecturesController.create)
router.get('/courses/:courseId/lectures/:id', authenticateUser, authorizeUser, lecturesController.show)
router.put('/courses/:courseId/lectures/:id', authenticateUser, authorizeUser,  lecturesController.update)
router.delete('/courses/:courseId/lectures/:id', authenticateUser,authorizeUser, lecturesController.destroy)
router.patch('/lectures/:id/comment', authenticateUser,authorizeUser, lecturesController.comment)
router.patch('/lectures/:id/uncomment/:commentId', authenticateUser,authorizeUser, lecturesController.uncomment)
router.patch('/lectures/:id/complete', authenticateUser,authorizeUser, lecturesController.markAsComplete)
module.exports = router