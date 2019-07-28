const consola = require('consola')
const { MongoClient } = require('mongodb')

const DatabaseError = require('../../errors/server/database')

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_RETRIES,
  MONGO_RECONNECT_INTERVAL
} = process.env

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}`
const options = {
  reconnectTries: 60 * 60 * 24,
  reconnectInterval: 1000,
  useNewUrlParser: true
}
let retries = 0

/**
 * Set the Mongo Database Listeners
 *
 * @param {Object} db
 */
function setDbListeners(db) {
  db.on('close', async () => {
    consola.warn('MongoDB connection was closed')
    try {
      await connect()
    } catch (err) {
      consola.warn('MongoDB disconnected')
    }
  })

  db.on('reconnect', () => {
    consola.warn('MongoDB reconnected')
  })
}

/**
 * Connection retry
 */
function retry() {
  consola.warn(`Retry to connect to MongoDB attempt ${retries}`)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(connect())
    }, MONGO_RECONNECT_INTERVAL || 1000)
  })
}

/**
 * Connect Mongo Database
 *
 * @returns {Object} client & db data
 */
const connect = async function connect() {
  try {
    const client = await MongoClient.connect(url, options)
    const db = client.db(MONGO_DB)

    consola.ready({
      message: `MongoDB listening on ${MONGO_HOST}:${MONGO_PORT}`,
      badge: true
    })

    setDbListeners(db)
    return { client, db }
  } catch (err) {
    const connectRetries = MONGO_RETRIES || 5
    if (retries >= connectRetries) {
      throw new DatabaseError()
    }

    retries++
    await retry()
  }
}

exports.mongoConnect = connect
