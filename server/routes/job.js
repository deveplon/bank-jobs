const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const { saveCompanyLogo } = require('../api/job')

router.post('/save-company-logo', upload.single('file'), saveCompanyLogo)

module.exports = router
