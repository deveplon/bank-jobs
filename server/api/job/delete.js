const { ObjectID } = require('mongodb')

/**
 * Remove Job from database
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id } = req.params

  try {
    await req.mongo.db
      .collection('jobs')
      .findOneAndDelete({ _id: ObjectID(id) })

    const job = await req.mongo.db
      .collection('jobs')
      .findOne({ _id: ObjectID(id) })

    if (job) throw new Error()

    return res.json({ code: 'OK' })
  } catch (err) {
    res.status(500).json({ error: 'We cannot proceed and remove the new job' })
  }
}
