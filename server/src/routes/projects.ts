import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  ProjectValidationSchema,
  ProjectIdValidationSchema,
  ProjectNameValidationSchema,
} from "../utils/validationSchemas/projectValidationSchema";
import {
  createProjectHandler,
  deleteProjectHandler,
  readProjectByNameHandler,
} from "../handlers/projectHandlers";
import { ProjectsEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  ProjectsEndpoints.PROJECTS,
  checkSchema(ProjectValidationSchema),
  createProjectHandler
);

// Read By Name
router.get(
  ProjectsEndpoints.PROJECT_BY_NAME,
  checkSchema(ProjectNameValidationSchema),
  readProjectByNameHandler
);

// Delete
router.delete(
  ProjectsEndpoints.PROJECT_BY_ID,
  checkSchema(ProjectIdValidationSchema),
  deleteProjectHandler
);

export default router;
