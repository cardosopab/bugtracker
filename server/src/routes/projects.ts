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
  readProjectByIdHandler,
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

// Read By NAME
router.get(
  ProjectsEndpoints.PROJECT_BY_NAME,
  checkSchema(ProjectNameValidationSchema),
  readProjectByNameHandler
);

// Read By ID
router.get(
  ProjectsEndpoints.PROJECT_BY_ID,
  checkSchema(ProjectIdValidationSchema),
  readProjectByIdHandler
);

// Delete
router.delete(
  ProjectsEndpoints.PROJECT_BY_ID,
  checkSchema(ProjectIdValidationSchema),
  deleteProjectHandler
);

export default router;
