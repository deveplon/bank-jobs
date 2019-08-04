/**
 * List the contacts
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
module.exports = async (req, res) => {
  const { order, rows, page } = req.query

  const sort = order && order === 'asc' ? { _id: 1 } : { _id: -1 }

  const limit = rows ? parseInt(rows) : 10

  const skipPage = parseInt(page) - 1
  const skip = page ? skipPage * limit : 0

  try {
    const contacts = await req.mongo.db
      .collection('contacts')
      .find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray()

    const totalRows = await req.mongo.db.collection('contacts').countDocuments()

    const totalPages = Math.ceil(totalRows / limit)
    const totalContacts = totalPages <= 0 ? 1 : totalPages

    return res.json({ code: 'OK', contacts, totalContacts })
  } catch (err) {
    return res.status(500).json({
      code: 'We experiment some problems now and cannot process your request'
    })
  }
}
