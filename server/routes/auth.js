const express = require('express')
const router = express.Router()

const { login, register, changePass } = require('../api/auth')

router.post('/login', login)
router.post('/register', register)
router.post('/change-pass', changePass)

module.exports = router
