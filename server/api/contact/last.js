/**
 * List last contact
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const lastContact = await req.mongo.db
      .collection('contacts')
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray()

    if (!lastContact) throw new Error()

    return res.json({ code: 'OK', job: lastContact[0] })
  } catch (err) {
    return res.status(404).json({ code: 'Not Found' })
  }
}
