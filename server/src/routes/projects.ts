import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  ProjectValidationSchema,
  ProjectIdValidationSchema,
  ProjectNameValidationSchema,
  ProjectPersonnelValidationSchema,
  ProjectCompanyValidationSchema,
  ProjectPageValidationSchema,
  ProjectEmailPersonnelValidationSchema,
  ProjectsPersonnelValidationSchema,
} from "../utils/validationSchemas/projectValidationSchema";
import {
  addPersonnelByEmailHandler,
  addPersonnelToArrayHandler,
  createProjectHandler,
  deletePersonnelFromArrayHandler,
  deleteProjectHandler,
  readAllProjectsHandler,
  readPaginatedProjectsHandler,
  readProjectByCompanyHandler,
  readProjectByIdHandler,
  readProjectByNameHandler,
  readProjectsByPersonnelHandler,
} from "../handlers/projectHandlers";
import { ProjectsEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  ProjectsEndpoints.PROJECTS,
  checkSchema(ProjectValidationSchema),
  createProjectHandler
);

// Create Personnel By ID
router.post(
  ProjectsEndpoints.PERSONNEL,
  checkSchema(ProjectPersonnelValidationSchema),
  addPersonnelToArrayHandler
);

// Create Personnel By EMAIL
router.post(
  ProjectsEndpoints.PROJECT_BY_EMAIL,
  checkSchema(ProjectEmailPersonnelValidationSchema),
  addPersonnelByEmailHandler
);

// Read All
router.get(
  ProjectsEndpoints.PROJECTS,
  // checkSchema(ProjectNameValidationSchema),
  readAllProjectsHandler
);

// Read By COMPANY
router.post(
  ProjectsEndpoints.PROJECTS_BY_COMPANY,
  checkSchema(ProjectCompanyValidationSchema),
  readProjectByCompanyHandler
);

// Read By PAGE
router.post(
  ProjectsEndpoints.PROJECTS_BY_PAGE,
  checkSchema(ProjectPageValidationSchema),
  readPaginatedProjectsHandler
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

// Read Project By Personnel ID
router.post(
  ProjectsEndpoints.PROJECT_BY_ID,
  checkSchema(ProjectsPersonnelValidationSchema),
  readProjectsByPersonnelHandler
);

// Delete
router.delete(
  ProjectsEndpoints.PROJECT_BY_ID,
  checkSchema(ProjectIdValidationSchema),
  deleteProjectHandler
);

// Delete Personnel By ID
router.delete(
  ProjectsEndpoints.PERSONNEL,
  checkSchema(ProjectPersonnelValidationSchema),
  deletePersonnelFromArrayHandler
);

export default router;
