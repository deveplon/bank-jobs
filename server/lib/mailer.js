const nodemailer = require('nodemailer')

const { MAIL_SERVICE, MAIL_USER, MAIL_PASS } = process.env

module.exports = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
})
