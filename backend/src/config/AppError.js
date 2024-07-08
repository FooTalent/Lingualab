class AppError extends Error {
  constructor(message, statusCode, data ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    
    Error.captureStackTrace(this, this.constructor);
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

export default AppError;