import jwt from 'jsonwebtoken'
import { secret } from '~/app.config.js'

/**
 * Encode values into jsonWebToken
 *
 * @param {Mixed} data
 * @param {Function} cb
 */
export const encode = (data, cb) => {
  jwt.sign({ data }, secret, { algorithm: 'RS256' }, cb)
}

export const decode = (token, cb) => {
  jwt.verify(token, secret, cb)
}
