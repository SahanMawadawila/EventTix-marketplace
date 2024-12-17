import express, { Response, Request } from "express";
import { body } from "express-validator";
import { errorValidation } from "../middleware/error-validation";
import { authenticateUser } from "../controllers/userController";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  errorValidation,
  authenticateUser
);

export { router as signinRouter };
