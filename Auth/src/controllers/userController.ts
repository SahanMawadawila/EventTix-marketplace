import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req); //checks if there are any errors attached to the request object

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
    //errors.array() returns an array of errors. means if user violates 3 rules, in validation, it will return an array of 3 errors.
    //create a object of class RequestValidationError and pass the array of errors to constructor of it
  }
  const { email, password } = req.body;

  try {
    const user = await UserModel.findUser(email);
    if (user) {
      console.log("User already exists");
      return res.status(400).send([{ message: "User already exists" }]);
      //we can create BadRequestError class and throw it here, but for simplicity I am just sending a message
    }

    const newUser = await UserModel.createUser(email, password);
    console.log("User created successfully");
    return res.status(201).send(newUser);
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};
