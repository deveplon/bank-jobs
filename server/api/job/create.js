/**
 * Save the company logo
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const job = req.body

  try {
    const { insertedId } = await req.mongo.db.collection('jobs').insertOne(job)

    return res.json({ code: 'OK', id: insertedId })
  } catch (err) {
    res.status(500).json({ error: 'We cannot proceed and create the new job' })
  }
}
