const express = require('express')
const router = express.Router()
const {Login, Me, Logout} = require('../controllers/AuthController')

router.get('/me',Me)
router.post('/login',Login)
router.delete('/logout',Logout)


module.exports = router;