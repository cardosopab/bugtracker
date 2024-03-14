import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  ProjectValidationSchema,
  ProjectIdValidationSchema,
  ProjectNameValidationSchema,
  PersonnelValidationSchema,
  ProjectCompanyValidationSchema,
} from "../utils/validationSchemas/projectValidationSchema";
import {
  addPersonnelToArrayHandler,
  createProjectHandler,
  deletePersonnelFromArrayHandler,
  deleteProjectHandler,
  readAllProjectsHandler,
  readProjectByCompanyHandler,
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

// Create Personnel By ID
router.post(
  ProjectsEndpoints.PERSONNEL,
  checkSchema(PersonnelValidationSchema),
  addPersonnelToArrayHandler
);

// Read All
router.get(
  ProjectsEndpoints.PROJECTS,
  // checkSchema(ProjectNameValidationSchema),
  readAllProjectsHandler
);

// Read By COMPANY
router.post(
  ProjectsEndpoints.PROJECT_BY_COMPANY,
  checkSchema(ProjectCompanyValidationSchema),
  readProjectByCompanyHandler
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

// Delete Personnel By ID
router.delete(
  ProjectsEndpoints.PERSONNEL,
  checkSchema(PersonnelValidationSchema),
  deletePersonnelFromArrayHandler
);

export default router;
