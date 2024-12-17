import { Request, Response, NextFunction } from "express";

export const VerifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser) {
    return next();
  }
  return res.status(401).send({ message: "Not Authorized" });
};
