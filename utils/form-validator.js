/**
 * Validate string text
 *
 * @param {String} text
 * @returns
 */
export const isValidText = text => {
  return /^[a-zA-Z0-9 ]*$/gm.test(text)
}

/**
 * Validate email
 *
 * @param {String} email
 * @returns
 */
export const isValidEmail = email => {
  return /\S+@\S+\.\S+/.test(email)
}

/**
 * Validate password
 *
 * @param {String} pass
 * @returns
 */
export const isValidPass = pass => {
  return /^[a-zA-Z0-9_\-#$^+=!*()@%&]*$/gm.test(pass)
}

/**
 * Validate if tow values match
 *
 * @param {Mixed} value
 * @param {Mixed} confirm
 * @returns
 */
export const match = (value, confirm) => {
  return value === confirm
}
