import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  TicketValidationSchema,
  TicketIdValidationSchema,
  TicketTitleValidationSchema,
  CommentValidationSchema,
  PageValidationSchema,
} from "../utils/validationSchemas/ticketValidationSchema";
import {
  addCommentToArrayHandler,
  createTicketHandler,
  deleteCommentFromArrayHandler,
  deleteTicketHandler,
  readAllTicketsHandler,
  readPaginatedTicketsHandler,
  readTicketByIdHandler,
  readTicketByTitleHandler,
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
  checkSchema(CommentValidationSchema),
  addCommentToArrayHandler
);

// Read All
router.get(
  TicketsEndpoints.TICKETS,
  // checkSchema(TicketTitleValidationSchema),
  readAllTicketsHandler
);

// Read By PAGE
router.post(
  TicketsEndpoints.TICKET_BY_PAGE,
  checkSchema(PageValidationSchema),
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
  checkSchema(TicketValidationSchema)
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
  checkSchema(CommentValidationSchema),
  deleteCommentFromArrayHandler
);

export default router;
