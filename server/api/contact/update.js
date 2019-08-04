const { ObjectID } = require('mongodb')

/**
 * Update a contact
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id, contact } = req.body

  try {
    await req.mongo.db
      .collection('contacts')
      .findOneAndUpdate({ _id: ObjectID(id) }, { $set: contact })

    return res.json({ code: 'OK' })
  } catch (err) {
    res.status(500).json({ error: 'We cannot proceed with the update' })
  }
}
