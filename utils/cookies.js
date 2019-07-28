/**
 * Get cookie by name
 *
 * @param {String} cookies
 * @param {String} name
 * @returns
 */
export const getCookie = (cookies, name) => {
  if (!cookies) return

  const cookie = cookies
    .split(';')
    .find(cookie => cookie.trim().startsWith(`${name}=`))
  if (!cookie) return

  return cookie.split('=')[1]
}

/**
 * Set Cookie by name value
 *
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
export const setCookie = (name, value, days) => {
  if (!name || !value) return

  const exdays = days || 1
  const now = new Date()
  now.setTime(now.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + now.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}
