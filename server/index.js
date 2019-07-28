const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const config = require('../nuxt.config.js')
const routes = require('./routes')
const { mongoConnect } = require('./db/mongo')

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

module.exports = async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  let mongo
  try {
    mongo = await mongoConnect()
  } catch (err) {
    consola.warn(err.message)
  }

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    req.mongo = mongo
    next()
  })

  app.use('/api', routes)

  // Give nuxt middleware to express
  app.use((req, res, next) => {
    if (/^\/api.*$/.test(req.originalUrl)) {
      return res.status(404).json({ error: 'Cannot find the api you call' })
    }
    return nuxt.render(req, res, next)
  })

  // Listen the server
  app.listen(port)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
