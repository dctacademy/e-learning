const express = require('express')
const router = express.Router() 
const { authenticateUser } = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/usersController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.put('/users/:id', authenticateUser, usersController.update)

router.get('/authors', authenticateUser, customersController.list)
router.post('/authors', authenticateUser, customersController.create)
router.get('/authors/:id', authenticateUser, customersController.show)
router.put('/authors/:id', authenticateUser, customersController.update)
router.delete('/authors/:id', authenticateUser, customersController.destory)

router.get('/categories', authenticateUser, productsController.list)
router.post('/categories', authenticateUser, productsController.create)
router.get('/categories/:id', authenticateUser, productsController.show)
router.put('/categories/:id', authenticateUser, productsController.update)
router.delete('/categories/:id', authenticateUser, productsController.destory)

router.post('/students/register', authenticateUser, productsController.list)
router.post('/students/login', authenticateUser, productsController.create)
router.get('/students', authenticateUser, productsController.list)
router.post('/students', authenticateUser, productsController.create)
router.get('/students/:id', authenticateUser, productsController.show)
router.put('/students/:id', authenticateUser, productsController.update)
router.delete('/students/:id', authenticateUser, productsController.destory)

router.get('/courses', authenticateUser, billsController.list)
router.post('/courses', authenticateUser, billsController.create)
router.get('/courses/:id', authenticateUser, billsController.show)
router.put('/courses/:id', authenticateUser, billsController.update)
router.delete('/courses/:id', authenticateUser, billsController.destory)

router.get('/courses/:id/lectures', authenticateUser, billsController.list)
router.post('/courses/:id/lectures', authenticateUser, billsController.create)
router.get('/courses/:id/lectures/:id', authenticateUser, billsController.show)
router.put('/courses/:id/lectures/:id', authenticateUser, billsController.update)
router.delete('/courses/:id/lectures/:id', authenticateUser, billsController.destory)

module.exports = router