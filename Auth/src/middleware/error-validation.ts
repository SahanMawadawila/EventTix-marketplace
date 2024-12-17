import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req); //checks if there are any errors attached to the request object

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
    //errors.array() returns an array of errors. means if user violates 3 rules, in validation, it will return an array of 3 errors.
    //create a object of class RequestValidationError and pass the array of errors to constructor of it
  }

  next();
};
