import { Router } from "express";
import "../strategies/local-strategies";
import { checkSchema } from "express-validator";
import {
  TicketValidationSchema,
  TicketIdValidationSchema,
  TicketNameValidationSchema,
  CommentValidationSchema,
} from "../utils/validationSchemas/ticketValidationSchema";
import {
  addCommentToArrayHandler,
  createTicketHandler,
  deleteCommentFromArrayHandler,
  deleteTicketHandler,
  readAllTicketsHandler,
  readTicketByIdHandler,
  readTicketByNameHandler,
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
  // checkSchema(TicketNameValidationSchema),
  readAllTicketsHandler
);

// Read By NAME
router.get(
  TicketsEndpoints.TICKET_BY_NAME,
  checkSchema(TicketNameValidationSchema),
  readTicketByNameHandler
);

// Read By ID
router.get(
  TicketsEndpoints.TICKET_BY_ID,
  checkSchema(TicketIdValidationSchema),
  readTicketByIdHandler
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
