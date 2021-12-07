const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)

router.post('/top5clist', auth.verify, Top5ListController.createTop5CList)
router.put('/top5clist/:id', auth.verify, Top5ListController.updateTop5CList)
router.delete('/top5clist/:id', auth.verify, Top5ListController.deleteTop5CList)
router.get('/top5clist/:id', auth.verify, Top5ListController.getTop5CListById)
router.get('/top5clists', auth.verify, Top5ListController.getTop5CLists)

module.exports = router