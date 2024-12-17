import express from "express";
import { body } from "express-validator";
import { createUser } from "../controllers/userController";
import { errorValidation } from "../middleware/error-validation";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 }) //middleware to check if password is between 4 and 20 characters. if any of the conditions are not met, it attaches an error message to the request object
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  errorValidation,
  createUser
);

export { router as signupRouter };
