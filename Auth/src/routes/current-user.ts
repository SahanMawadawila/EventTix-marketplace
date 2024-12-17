import express from "express";
import { currentUser } from "../middleware/curret-user";
import { currentUserController } from "../controllers/userController";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentUserController);
export { router as currentUserRouter };
