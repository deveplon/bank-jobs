const bcrypt = require('bcryptjs')
const { ObjectID } = require('mongodb')

/**
 * Register new user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await req.mongo.db
      .collection('users')
      .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { password: hash } })

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
