const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const { list, last, send, update, file } = require('../api/contact')

router.get('/list', list)
router.get('/last', last)

router.post('/update', update)
router.post('/send', send)
router.post('/file', upload.single('file'), file)

module.exports = router
