import CustomError from './custom-error'

export default class NotFoundError extends CustomError {
  statusCode = 404

  constructor(public message = 'Route not found') {
    super(message)

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }]
  }
}
