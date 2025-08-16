import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controllers.js";
const router = Router();

// Basic auth
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

export default router;
