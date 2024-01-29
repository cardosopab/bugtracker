import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { ProjectValidationSchema } from "../utils/validationSchemas/projectValidationSchema";
import { createProjectHandler } from "../handlers/projectHandlers";
import { ProjectsEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  ProjectsEndpoints.PROJECTS,
  checkSchema(ProjectValidationSchema),
  createProjectHandler
);

export default router;
