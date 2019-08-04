const { ObjectID } = require('mongodb')

/**
 * Get job by id
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id } = req.params

  try {
    const job = await req.mongo.db
      .collection('jobs')
      .findOne({ _id: ObjectID(id) })

    if (!job) throw new Error()

    return res.json({ code: 'OK', job })
  } catch (err) {
    return res
      .status(404)
      .json({ code: `We cannot find the Job with id ${id}` })
  }
}
