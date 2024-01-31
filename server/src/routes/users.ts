import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  PatchUserValidationSchema,
  UserEmailValidationSchema,
  UserIdValidationSchema,
  UserValidationSchema,
} from "../utils/validationSchemas/userValidationSchema";
import {
  createUserHandler,
  deleteUserByIdHandler,
  readUserByEmailHandler,
  readUserByIdHandler,
  updateUserByIdHandler,
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

// Read By ID
router.get(
  UsersEndpoints.USER_BY_ID,
  checkSchema(UserIdValidationSchema),
  readUserByIdHandler
);

// Update By ID
router.patch(
  UsersEndpoints.USER_BY_ID,
  checkSchema(PatchUserValidationSchema),
  updateUserByIdHandler
);

// Delete
router.delete(
  UsersEndpoints.USER_BY_ID,
  checkSchema(UserIdValidationSchema),
  deleteUserByIdHandler
);
export default router;
