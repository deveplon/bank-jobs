const bcrypt = require('bcryptjs')

/**
 * Register new user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { email, name, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await req.mongo.db
      .collection('users')
      .createIndex({ email: 1 }, { unique: true })
    await req.mongo.db
      .collection('users')
      .insertOne({ email, name, password: hash })

    return res.json({ code: 'OK' })
  } catch (err) {
    if (err.message.indexOf('E11000') !== -1) {
      return res
        .status(400)
        .json({ error: 'Email already exists on our database' })
    }

    return res.status(500).json({ error: 'We are experiment some problems' })
  }
}
