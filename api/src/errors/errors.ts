export class BadRequestError extends Error{
    statusCode: number;
    errorCode: string;
  
    constructor(message: string) {
      super(message);
      this.statusCode = 400;
      this.errorCode = "Bad Request";
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
}

export class NotAuthenticatedError extends Error {
  errorCode: number;

  constructor(message?: string) {
    super(message || "User is not authenticated.");
    this.name = "NotAuthenticatedError";
    this.errorCode = 401; 
  }
}



export const ErrorStatusNumber = {
  notFoundError: 404,
  badRequestError: 400,
  unAuthorized: 401
}

export const ErrorMessages = {
  notFoundError: "Not Found",
  badRequestError: "Bad Request"
}