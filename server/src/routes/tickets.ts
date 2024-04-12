import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  TicketValidationSchema,
  TicketIdValidationSchema,
  TicketCommentValidationSchema,
  TicketPageValidationSchema,
  TicketProjectValidationSchema,
} from "../utils/validationSchemas/ticketValidationSchema";
import {
  addCommentToArrayHandler,
  createTicketHandler,
  deleteCommentFromArrayHandler,
  deleteTicketHandler,
  readPaginatedTicketsHandler,
  readTicketByIdHandler,
  readTicketsByProjectHandler,
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

// Read By PROJECT
router.post(
  TicketsEndpoints.TICKETS_BY_PROJECT,
  checkSchema(TicketProjectValidationSchema),
  readTicketsByProjectHandler
);

// Read By PAGE
router.post(
  TicketsEndpoints.TICKETS_BY_PAGE,
  checkSchema(TicketPageValidationSchema),
  readPaginatedTicketsHandler
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

// Delete By ID
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
