/**
 * Save the company logo
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const { path } = req.file
    const filename = `${path.replace('static', '')}`

    const { insertedId } = await req.mongo.db
      .collection('jobs')
      .insertOne({ companyLogo: filename })

    return res.json({ code: 'OK', id: insertedId })
  } catch (err) {
    return res.status(500).json({ error: 'We cannot save the image right now' })
  }
}
