const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const { list, lastJob, create, update, saveImage } = require('../api/job')

router.get('/list', list)
router.get('/last', lastJob)

router.post('/create', create)
router.post('/update', update)
router.post('/save-image', upload.single('file'), saveImage)

module.exports = router
