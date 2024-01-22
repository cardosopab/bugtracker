import passport from "passport";
import { Router } from "express";
import "../strategies/local-strategies";

const router = Router();

// Login
router.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// Status
router.get("/api/auth/status", (req, res) => {
  if (req.user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Logout
router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

export default router;