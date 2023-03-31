const express = require('express')
const router = express.Router()
const {getUsers, createUser, getUserById, updateUser, deleteUser} = require('../controllers/UserController')
const {verifyUser} = require('../middleware/AuthUser')

router.get('/users',verifyUser,getUsers)
router.get('/users/:id',verifyUser,getUserById)
router.post('/users',createUser)
router.patch('/users/:id',verifyUser,updateUser)
router.delete('/users/:id',verifyUser,deleteUser)


module.exports = router;