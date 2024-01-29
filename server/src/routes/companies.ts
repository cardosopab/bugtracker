import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { CompanyValidationSchema } from "../utils/validationSchemas/companyValidationSchema";
import { createCompanyHandler } from "../handlers/companyHandlers";
import { CompaniesEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  CompaniesEndpoints.COMPANIES,
  checkSchema(CompanyValidationSchema),
  createCompanyHandler
);

export default router;
