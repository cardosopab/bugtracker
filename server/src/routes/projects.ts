import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { ProjectValidationSchema } from "../utils/validationSchemas/projectValidationSchema";
import { createProjectHandler } from "../handlers/projectHandlers";

const router = Router();

const projectsEndpoint = "/api/projects/";
// Create
router.post(
  projectsEndpoint,
  checkSchema(ProjectValidationSchema),
  createProjectHandler
);

export default router;
