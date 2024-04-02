import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  TicketValidationSchema,
  TicketIdValidationSchema,
  TicketTitleValidationSchema,
  TicketCommentValidationSchema,
  TicketPageValidationSchema,
  TicketCompanyValidationSchema,
} from "../utils/validationSchemas/ticketValidationSchema";
import {
  addCommentToArrayHandler,
  createTicketHandler,
  deleteCommentFromArrayHandler,
  deleteTicketHandler,
  readAllTicketsHandler,
  readPaginatedTicketsHandler,
  readTicketByCompanyHandler,
  readTicketByIdHandler,
  readTicketByTitleHandler,
} from "../handlers/ticketHandler";
import { DashboardEndpoints, TicketsEndpoints } from "../constants/endpoints";
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
