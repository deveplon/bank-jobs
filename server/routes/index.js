const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const jobRoutes = require('./job')
const contactRoutes = require('./contact')

router.use('/auth', authRoutes)
router.use('/job', jobRoutes)
router.use('/contact', contactRoutes)

module.exports = router
