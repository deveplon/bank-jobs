const bcrypt = require('bcryptjs')

const consola = require('consola')

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

module.exports = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await req.mongo.db.collection('users').findOne({ email })
    if (!user) return dataError(res, 'email')

    const decrypt = await bcrypt.compare(password, user.password)
    if (!decrypt) {
      return dataError(res, 'password')
    }

    return res.json({ id: user._id, email })
  } catch (err) {
    consola.log(err)
    return res.status(400).json({ error: 'Invalid data' })
  }
}
