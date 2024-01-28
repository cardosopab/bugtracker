import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { CompanyValidationSchema } from "../utils/validationSchemas/companyValidationSchema";
import { createCompanyHandler } from "../handlers/companyHandlers";

const router = Router();

const companiesEndpoint = "/api/companies/";
// Create
router.post(
  companiesEndpoint,
  checkSchema(CompanyValidationSchema),
  createCompanyHandler
);

export default router;
