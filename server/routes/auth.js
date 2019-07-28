const express = require('express')
const router = express.Router()

const login = require('../api/auth/login')

router.post('/login', login)

module.exports = router
