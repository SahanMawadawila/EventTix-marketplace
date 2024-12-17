import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

//augment the Request interface to add a currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next(); //if there is no jwt in session, or session property is not defined, then return next() and move to next middleware
  }
  //verify the jwt
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload; //this function error return if verification fails, otherwise it returns the payload
    req.currentUser = payload; //add the payload to the request object
  } catch (err) {}

  next();
};
