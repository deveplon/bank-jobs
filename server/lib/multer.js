const multer = require('multer')

/**
 * The multer package with configuration
*/
const storage = multer.diskStorage({
  destination: './static/company_logos/',
  filename: function (req, file, cb) {
    const { fieldname, mimetype } = file
    cb(null, `${fieldname}-${Date.now()}.${mimetype.replace('image/', '')}`)
  }
})

module.exports = multer({ storage: storage, limits: { fileSize: 10000000 } })
