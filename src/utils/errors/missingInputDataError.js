import AppError from 'utils/errors/appError.js'

class MissingInputDataError extends AppError {
  constructor (message = 'Some of the input data required is missing') {
    // Providing default message and overriding status code (Bad Request in this case).
    super(message, 400)
    this.name = 'MissingInputDataError'
  }
}

export default MissingInputDataError
