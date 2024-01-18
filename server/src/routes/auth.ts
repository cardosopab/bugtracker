import passport from "passport";
import { Router } from "express";
import "../strategies/local-strategies";
import { createUserHandler } from "../handlers/authHandlers";
import { checkSchema } from "express-validator";
import { UserValidationSchema } from "../utils/validationSchemas/userValidationSchema";

const router = Router();

// Create
router.post(
  "/api/auth/create",
  checkSchema(UserValidationSchema),
  createUserHandler
);

// Login
router.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  console.log("api/auth");
  res.sendStatus(200);
});

// Status
router.get("/api/auth/status", (req, res) => {
  console.log(req.user);
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
    console.log("logout");
    res.sendStatus(200);
  });
});

export default router;
