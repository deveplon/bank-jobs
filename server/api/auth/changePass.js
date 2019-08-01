const bcrypt = require('bcryptjs')
const { ObjectID } = require('mongodb')

/**
 * Send Invalid data error
 *
 * @param {Object} res
 * @param {String} type
 * @returns
 */
function dataError(res, type) {
  return res.status(400).json({ error: `Invalid ${type}` })
}

/**
 * Register new user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id, password } = req.body

  if (!/^[a-zA-Z0-9 ]*$/gm.test(id)) return dataError(res, 'user')
  if (password.trim().length < 6 || !/^[a-zA-Z0-9_\-#$^+=!*()@%&]*$/gm.test(password)) {
    return dataError(res, 'password')
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await req.mongo.db.collection('users').findOneAndUpdate({ _id: ObjectID(id) }, { $set: { password: hash } })

    return res.json({ code: 'OK' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    if (err.message.indexOf('E11000') !== -1) {
      return res.status(400).json({ error: 'Email already exists on our database' })
    }

    return res.status(500).json({ error: 'We are experiment some problems' })
  }
}
