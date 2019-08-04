/* eslint-disable no-tabs */
const mailer = require('../../lib/mailer')
const { MAIL_SENDER, MAIL_RECEIVERS } = process.env

/**
 * Send the email
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { path, email, name, phone } = req.body

  try {
    const { messageId } = await mailer.sendMail({
      from: MAIL_SENDER,
      to: MAIL_RECEIVERS,
      subject: `New resume from bank jobs of ${name}`,
      text: `
				New Contact\n
				Name: ${name}\n
				Email: ${email}\n
				Phone: ${phone}\n
			`,
      html: `
				<h2>New Contact</h2>
				<p>Name: ${name}</p>
				<p>Email: ${email}</p>
				<p>Phone: ${phone}</p>
			`,
      attachments: [{ path }]
    })

    if (!messageId) throw new Error()

    return res.json({ code: 'OK', messageId })
  } catch (err) {
    return res.status(404).json({ code: 'Not Found' })
  }
}
