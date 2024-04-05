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
  updateTicketByIdHandler,
} from "../handlers/ticketHandler";
import { TicketsEndpoints } from "../constants/endpoints";

const router = Router();

// Create
router.post(
  TicketsEndpoints.TICKETS,
  checkSchema(TicketValidationSchema),
  createTicketHandler
);

// Create Comment By ID
router.post(
  TicketsEndpoints.COMMENTS,
  checkSchema(TicketCommentValidationSchema),
  addCommentToArrayHandler
);

// Read All
router.get(
  TicketsEndpoints.TICKETS,
  // checkSchema(TicketTitleValidationSchema),
  readAllTicketsHandler
);

// Read By COMPANY
router.post(
  TicketsEndpoints.TICKETS_BY_COMPANY,
  checkSchema(TicketCompanyValidationSchema),
  readTicketByCompanyHandler
);

// Read By PAGE
router.post(
  TicketsEndpoints.TICKETS_BY_PAGE,
  checkSchema(TicketPageValidationSchema),
  readPaginatedTicketsHandler
);

// Read By TITLE
router.get(
  TicketsEndpoints.TICKET_BY_TITLE,
  checkSchema(TicketTitleValidationSchema),
  readTicketByTitleHandler
);

// Read By ID
router.get(
  TicketsEndpoints.TICKET_BY_ID,
  checkSchema(TicketIdValidationSchema),
  readTicketByIdHandler
);

// Update By ID
router.patch(
  TicketsEndpoints.TICKET_BY_ID,
  checkSchema(TicketValidationSchema),
  updateTicketByIdHandler
);

// Delete
router.delete(
  TicketsEndpoints.TICKET_BY_ID,
  checkSchema(TicketIdValidationSchema),
  deleteTicketHandler
);

// Delete Comment By ID
router.delete(
  TicketsEndpoints.COMMENTS,
  checkSchema(TicketCommentValidationSchema),
  deleteCommentFromArrayHandler
);

export default router;
