import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  CompanyIdValidationSchema,
  CompanyNameValidationSchema,
  CompanyValidationSchema,
  PersonnelValidationSchema,
} from "../utils/validationSchemas/companyValidationSchema";
import {
  addPersonnelToArrayHandler,
  createCompanyHandler,
  deleteCompanyHandler,
  deletePersonnelFromArrayHandler,
  readCompanyByIdHandler,
  readCompanyByNameHandler,
} from "../handlers/companyHandlers";
import { CompaniesEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  CompaniesEndpoints.COMPANIES,
  checkSchema(CompanyValidationSchema),
  createCompanyHandler
);

// Create Personnel By ID
router.post(
  CompaniesEndpoints.PERSONNEL,
  checkSchema(PersonnelValidationSchema),
  addPersonnelToArrayHandler
);

// Read By NAME
router.get(
  CompaniesEndpoints.COMPANY_BY_NAME,
  checkSchema(CompanyNameValidationSchema),
  readCompanyByNameHandler
);

// Read By ID
router.get(
  CompaniesEndpoints.COMPANY_BY_ID,
  checkSchema(CompanyIdValidationSchema),
  readCompanyByIdHandler
);

// Delete
router.delete(
  CompaniesEndpoints.COMPANY_BY_ID,
  checkSchema(CompanyIdValidationSchema),
  deleteCompanyHandler
);

// Delete Personnel By ID
router.delete(
  CompaniesEndpoints.PERSONNEL,
  checkSchema(PersonnelValidationSchema),
  deletePersonnelFromArrayHandler
);

export default router;
