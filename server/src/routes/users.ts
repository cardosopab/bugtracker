import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  UserEmailValidationSchema,
  UserIdValidationSchema,
  UserValidationSchema,
} from "../utils/validationSchemas/userValidationSchema";
import {
  createUserHandler,
  deleteUserByIdHandler,
  readUserByEmailHandler,
} from "../handlers/userHandlers";
import { UsersEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  UsersEndpoints.USERS,
  checkSchema(UserValidationSchema),
  createUserHandler
);
// Read By EMAIL
router.get(
  UsersEndpoints.USER_BY_EMAIL,
  checkSchema(UserEmailValidationSchema),
  readUserByEmailHandler
);

// Delete
router.delete(
  UsersEndpoints.USERS,
  checkSchema(UserIdValidationSchema),
  deleteUserByIdHandler
);
export default router;
