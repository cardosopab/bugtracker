import passport from "passport";
import { Router } from "express";
import "../strategies/local-strategies";
import {
  loginHandler,
  logoutHandler,
  statusHandler,
} from "../handlers/authHandlers";

const router = Router();

// Login
router.post("/api/auth/login", passport.authenticate("local"), loginHandler);

// Status
router.get("/api/auth/status", statusHandler);

// Logout
router.post("/api/auth/logout", logoutHandler);

export default router;
