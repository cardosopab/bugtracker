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
  readAllUsersHandler,
  readUserByEmailHandler,
  readUserByIdHandler,
  updateUserByIdHandler,
} from "../handlers/userHandlers";
import { UsersEndpoints } from "../constants/endpoints";
import { isAdminMiddleware } from "../middlewares";

const router = Router();

// Create
router.post(
  UsersEndpoints.USERS,
  isAdminMiddleware,
  checkSchema(UserValidationSchema),
  createUserHandler
);

// Read By All
router.get(
  UsersEndpoints.USERS,
  readAllUsersHandler
);

// Read By EMAIL
router.get(
  UsersEndpoints.USER_BY_EMAIL,
  isAdminMiddleware,
  checkSchema(UserEmailValidationSchema),
  readUserByEmailHandler
);

// Read By ID
router.get(
  UsersEndpoints.USER_BY_ID,
  isAdminMiddleware,
  checkSchema(UserIdValidationSchema),
  readUserByIdHandler
);

// Update By ID
router.patch(
  UsersEndpoints.USER_BY_ID,
  isAdminMiddleware,
  checkSchema(PatchUserValidationSchema),
  updateUserByIdHandler
);

// Delete
router.delete(
  UsersEndpoints.USER_BY_ID,
  isAdminMiddleware,
  checkSchema(UserIdValidationSchema),
  deleteUserByIdHandler
);
export default router;
