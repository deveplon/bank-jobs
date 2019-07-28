import jwt from 'jsonwebtoken'
import { secret } from '~/app.config.js'

/**
 * Encode values into jsonWebToken
 *
 * @param {Mixed} data
 * @param {Function} cb
 */
export const encode = data => {
  return jwt.sign({ data }, secret)
}

export const decode = token => {
  return jwt.verify(token, secret)
}
