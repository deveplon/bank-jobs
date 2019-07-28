const bcrypt = require('bcryptjs')

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
  const { email, name, password } = req.body

  if (!/\S+@\S+\.\S+/.test(email)) return dataError(res, 'email')
  if (!/^[a-zA-Z0-9 ]*$/gm.test(name)) return dataError(res, 'name')
  if (
    password.trim().length < 6 ||
    !/^[a-zA-Z0-9_\-#$^+=!*()@%&]*$/gm.test(password)
  ) {
    return dataError(res, 'password')
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await req

    await req.mongo.db
      .collection('users')
      .createIndex({ email: 1 }, { unique: true })
    await req.mongo.db
      .collection('users')
      .insertOne({ email, name, password: hash })
  } catch (err) {
    if (err.message.indexOf('E11000') !== -1) {
      return res
        .status(400)
        .json({ error: 'Email already exists on our database' })
    }

    return res.status(500).json({ error: 'We are experiment some problems' })
  }
}
