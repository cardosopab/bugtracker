import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { UserValidationSchema } from "../utils/validationSchemas/userValidationSchema";
import { createUserHandler } from "../handlers/userHandlers";

const router = Router();

const usersEndpoint = "/api/users/";
// Create
router.post(
  usersEndpoint,
  checkSchema(UserValidationSchema),
  createUserHandler
);

export default router;
