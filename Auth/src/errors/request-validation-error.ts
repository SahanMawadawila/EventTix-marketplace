import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError {
  //here we extend the built in class Error
  statusCode = 400; //property of the class
  constructor(public errors: ValidationError[]) {
    super("Invalid parameters passed by the user");
    Object.setPrototypeOf(this, RequestValidationError.prototype); //to fix the issue of extending a built in class By setting the prototype correctly, you ensure that instanceof checks work as expected.
  }
  serializeErrors() {
    //This is how method is defined in a class
    return this.errors.map((err) => {
      return { message: err.msg };
      //map() method creates a new array, it is returned from this method. This method is used to convert the array of errors into format that we want to send back to the user
    });
  }
}
