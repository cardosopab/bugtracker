import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  PatchUserValidationSchema,
  UserCompanyValidationSchema,
  UserEmailValidationSchema,
  UserIdValidationSchema,
  UserValidationSchema,
} from "../utils/validationSchemas/userValidationSchema";
import {
  createUserHandler,
  deleteUserByIdHandler,
  readAllCompanyUsersHandler,
  readAllUsersHandler,
  readUserByEmailHandler,
  readUserByIdHandler,
  updateUserByIdHandler,
} from "../handlers/userHandlers";
import { UsersEndpoints } from "../constants/endpoints";
import { isAdminMiddleware } from "../middlewares";
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const isTesting: Boolean = process.env.TESTING === "true";
if (isTesting) console.log(`isTesting: ${isTesting}`);

// Create
router.post(
  UsersEndpoints.USERS,
  isTesting ? [] : isAdminMiddleware,
  checkSchema(UserValidationSchema),
  createUserHandler
);

// Read All
router.get(UsersEndpoints.USERS, readAllUsersHandler);

// Read ALL Company
router.post(
  UsersEndpoints.USER_BY_COMPANY,
  checkSchema(UserCompanyValidationSchema),
  readAllCompanyUsersHandler
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
