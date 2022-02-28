import CustomError from './custom-error'

export default class NotAuthorizedError extends CustomError {
  statusCode = 401

  constructor(public message = 'Not authorized') {
    super(message)

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }]
  }
}
