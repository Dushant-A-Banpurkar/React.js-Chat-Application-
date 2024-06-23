import express from "express";
import { login, logout, signup } from "../controllers/auth_controller.js";

const router = express.Router();

router.get("/me");
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

export default router;
