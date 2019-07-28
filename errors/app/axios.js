function AxiosError(code, message) {
  this.name = 'AxiosError'
  this.message = message || 'Axios request fails'
  this.code = code || 500
  this.stack = new Error().stack
}

AxiosError.prototype = Object.create(Error.prototype)
AxiosError.prototype.constructor = AxiosError

export default AxiosError
