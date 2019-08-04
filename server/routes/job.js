const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const {
  list,
  getById,
  lastJob,
  create,
  update,
  saveImage
} = require('../api/job')

router.get('/', list)
router.get('/last', lastJob)
router.get('/:id', getById)
<<<<<<< HEAD
=======

>>>>>>> be3f9c63da5205691ef4b6f0a4a2d908d175c7b6

router.post('/create', create)
router.post('/update', update)
router.post('/save-image', upload.single('file'), saveImage)

module.exports = router
