const express = require('express')
const router = express.Router()

const upload = require('../lib/multer')

const {
  list,
  getById,
  lastJob,
  create,
  update,
  saveImage,
  deleteJob
} = require('../api/job')

router.get('/', list)
router.get('/last', lastJob)
router.get('/:id', getById)

router.post('/create', create)
router.post('/update', update)
router.post('/save-image', upload.single('file'), saveImage)

router.delete('/:id', deleteJob)

module.exports = router
