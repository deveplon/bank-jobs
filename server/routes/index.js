const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const jobRoutes = require('./job')

router.use('/auth', authRoutes)
router.use('/job', jobRoutes)

module.exports = router
