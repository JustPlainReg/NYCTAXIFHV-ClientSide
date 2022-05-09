class AppError extends Error {
  constructor (message, status) {
    // Calling parent constructor of base Error class.
    super(message)

    // Capturing stack trace, excluding constructor call from it.
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }

    // Saving class name in the property of our custom error as a shortcut.
    this.name = 'AppError'

    // Setting 500 as default value if status not specified.
    this.status = status || 500
  }
}

export default AppError
