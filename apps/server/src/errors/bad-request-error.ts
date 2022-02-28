import CustomError from './custom-error'

export default class BadRequestError extends CustomError {
  constructor(public message: string, public statusCode = 400) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }]
  }
}
