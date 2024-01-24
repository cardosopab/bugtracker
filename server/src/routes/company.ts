import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { CompanyValidationSchema } from "../utils/validationSchemas/companyValidationSchema";
import { createCompanyHandler } from "../handlers/companyHandlers";

const router = Router();

const companyEndpoint = "/api/company/";
// Create
router.post(
  companyEndpoint + "create",
  checkSchema(CompanyValidationSchema),
  createCompanyHandler
);

export default router;
