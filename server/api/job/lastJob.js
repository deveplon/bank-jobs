/**
 * List last job
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const lastJob = await req.mongo.db
      .collection('jobs')
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray()

    if (!lastJob) throw new Error()

    return res.json({ code: 'OK', job: lastJob[0] })
  } catch (err) {
    return res.status(404).json({ code: 'Not Found' })
  }
}
