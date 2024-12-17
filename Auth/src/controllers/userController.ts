import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findUser(email);
    if (user) {
      console.log("User already exists");
      return res.status(400).send([{ message: "User already exists" }]);
      //we can create BadRequestError class and throw it here, but for simplicity I am just sending a message
    }

    const newUser = await UserModel.createUser(email, password);

    const userJwt = jwt.sign(
      {
        id: newUser.email,
        email: newUser.email,
      },
      process.env.JWT_KEY! // '!' tells typescript that we are sure that JWT_KEY is defined. we should check it before connecting to the database
    );

    req.session = {
      //req.session is an object that is added by cookie-session middleware
      jwt: userJwt,
    };
    console.log("User created successfully");
    return res.status(201).send({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findUser(email);
    if (!user) {
      console.log("User not found");
      return res.status(400).send([{ message: "Invalid credentials" }]);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Invalid credentials");
      return res.status(400).send([{ message: "Invalid credentials" }]);
    }

    const userJwt = jwt.sign(
      {
        id: user.email,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    console.log("User authenticated successfully");
    return res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const currentUserController = async (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null });
};

export const signOut = async (req: Request, res: Response) => {
  req.session = null; //remove the jwt from the session object
  res.send({});
};
