import { ErrorRequestHandler } from 'express'
import CustomError from '../errors/custom-error'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: Error, _, res, __) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  })
}

export default errorHandler
