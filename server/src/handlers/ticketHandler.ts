import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import Ticket from "../mongoose/schemas/Ticket";

export const createTicketHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  const newTicket = new Ticket(data);
  try {
    const savedTicket = await newTicket.save();

    const tickets = await Ticket.find();
    if (!tickets) return res.status(404).send("Tickets not found");

    return res.status(200).send(tickets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const addCommentToArrayHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  const { ticketId, commentId } = data;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).send("Ticket not found");

    ticket.comments.push(commentId);
    const updatedTicket = await ticket.save();

    const tickets = await Ticket.find();
    if (!tickets) return res.status(404).send("Tickets not found");

    return res.status(200).send(tickets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readAllTicketsHandler = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets) return res.status(404).send("Tickets not found");

    return res.status(200).send(tickets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readTicketByNameHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const ticket = await Ticket.findOne(data);
    if (!ticket) return res.status(404).send("Ticket not found");

    return res.status(200).send(ticket);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readTicketByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const ticket = await Ticket.findById(data.ticketId);
    if (!ticket) return res.status(404).send("Ticket not found");

    return res.status(200).send(ticket);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteTicketHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  console.log(`result: ${JSON.stringify(result)}`);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(data.ticketId);
    if (!deletedTicket) return res.status(404).send("Ticket not found");

    const tickets = await Ticket.find();
    if (!tickets) return res.status(404).send("Tickets not found");

    return res.status(200).send(tickets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteCommentFromArrayHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  const { ticketId, commentId } = data;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).send("Ticket not found");

    const index = ticket.comments.indexOf(commentId);
    if (index === -1) return res.status(200).send(ticket);

    ticket.comments.splice(index, 1);
    const updatedTicket = await ticket.save();

    const tickets = await Ticket.find();
    if (!tickets) return res.status(404).send("Tickets not found");

    return res.status(200).send(tickets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};