const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const { list, getById, last, send, update, file } = require('../api/contact')

router.get('/', list)
router.get('/:id', getById)
router.get('/last', last)

router.post('/update', update)
router.post('/send', send)
router.post('/file', upload.single('file'), file)

module.exports = router
