import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import { DashboardEndpoints } from "../constants/endpoints";
import { DashboardValidationSchema } from "../utils/validationSchemas/dashboardValidationSchema";
import { readDashboardData } from "../handlers/dashboardHandlers";

const router = Router();

// Read Dashboard Data
router.post(
  DashboardEndpoints.DATA,
  checkSchema(DashboardValidationSchema),
  readDashboardData
);

export default router;
