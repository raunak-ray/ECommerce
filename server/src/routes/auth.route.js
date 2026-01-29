import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";
import protectRoutes from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectRoutes, getMe);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
