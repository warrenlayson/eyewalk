import CustomError from './custom-error'

export default class DatabaseConnectionError extends CustomError {
  statusCode = 500

  constructor(public reason = 'Error connecting to database') {
    super('Error connecting to db')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
