import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { UserValidationSchema } from "../utils/validationSchemas/userValidationSchema";
import { createUserHandler } from "../handlers/userHandlers";
import { UsersEndpoints } from "../contants/endpoints";

const router = Router();

// Create
router.post(
  UsersEndpoints.USERS,
  checkSchema(UserValidationSchema),
  createUserHandler
);

export default router;
