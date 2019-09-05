const { ObjectID } = require('mongodb')

/**
 * Update a job
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { id, ...job } = req.body
  console.log(id)
  try {
    const response = await req.mongo.db
      .collection('jobs')
      .findOneAndUpdate({ _id: ObjectID(id) }, { $set: job })
    console.log(response)
    return res.json({ code: 'OK' })
  } catch (err) {
    res.status(500).json({ error: 'We cannot proceed with the update' })
  }
}
