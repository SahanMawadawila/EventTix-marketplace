export abstract class CustomError extends Error {
  abstract statusCode: number; //abstract property
  constructor(message: string) {
    //this message property only use for logging purpose by the Error class default
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
