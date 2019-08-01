/**
 * Save the company logo
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { path, mimetype } = req.file

  const filename = `${path}.${mimetype.replace('image/', '')}`

  const { insertedId } = await req.mongo.db.collection('jobs').insertOne({ companyLogo: filename })

  return res.json({ code: 'OK', id: insertedId })
}
