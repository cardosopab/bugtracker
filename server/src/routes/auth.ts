import passport from "passport";
import { Router } from "express";
import "../strategies/local-strategies";
import {
  loginHandler,
  logoutHandler,
  statusHandler,
} from "../handlers/authHandlers";
import { AuthEndpoints } from "../contants/endpoints";

const router = Router();

// Login
router.post(AuthEndpoints.LOGIN, passport.authenticate("local"), loginHandler);

// Status
router.get(AuthEndpoints.STATUS, statusHandler);

// Logout
router.post(AuthEndpoints.LOGOUT, logoutHandler);

export default router;
