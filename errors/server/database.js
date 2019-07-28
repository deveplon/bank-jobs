function DatabaseError(message) {
  this.name = 'DatabaseError'
  this.message = message || 'Cannot communicate with the database system now'
  this.stack = new Error().stack
}

DatabaseError.prototype = Object.create(Error.prototype)
DatabaseError.prototype.constructor = DatabaseError

module.exports = DatabaseError
