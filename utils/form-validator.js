/**
 * Validate string text
 *
 * @param {String} text
 * @returns
 */
export const isValidText = text => {
  if (text.trim().length === 0) return false

  return /^[a-zA-Z0-9_\-#$^+=!*()@%& ]*$/gm.test(text)
}

/**
 * Validate string text
 *
 * @param {String} text
 * @returns
 */
export const isValidNumber = number => {
  if (number.trim().length === 0) return false

  return /^[0-9]*$/gm.test(number)
}

/**
 * Validate email
 *
 * @param {String} email
 * @returns
 */
export const isValidEmail = email => {
  if (email.trim().length === 0) return false

  return /\S+@\S+\.\S+/.test(email)
}

/**
 * Validate password
 *
 * @param {String} pass
 * @returns
 */
export const isValidPass = pass => {
  if (pass.trim().length < 6) return false

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
  if (value.trim().length === 0 || confirm.trim().length === 0) return false

  return value === confirm
}
