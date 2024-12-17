import express from "express";
import { signOut } from "../controllers/userController";

const router = express.Router();

router.post("/api/users/signout", signOut);

export { router as signoutRouter };
