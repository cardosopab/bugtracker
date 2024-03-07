import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";
import { TicketsEndpoints } from "../src/constants/endpoints";

dotenv.config();

describe("Ticket life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  const submitterId = new mongoose.Types.ObjectId();
  const title = `title_${submitterId}`;
  const description = `description_${submitterId}`;
  const projectId = new mongoose.Types.ObjectId();
  const companyId = new mongoose.Types.ObjectId();
  const personnelId = new mongoose.Types.ObjectId();
  const newCommentId = new mongoose.Types.ObjectId();
  const commentsIdArray = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ];
  const updatedCommentsIdArrary = [...commentsIdArray, newCommentId];
  let mongoTicketId: string;

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create ticket", async () => {
    const res = await request(app).post(TicketsEndpoints.TICKETS).send({
      title: title,
      description: description,
      projectId: projectId,
      companyId: companyId,
      submitterId: submitterId,
      personnelId: personnelId,
      priority: "Low",
      status: "Backlog",
      type: "Task",
      comments: [],
    });
    expect(res.statusCode).toBe(201);
  });

  test("should find ticket by title", async () => {
    const res = await request(app).get(TicketsEndpoints.TICKET_BY_TITLE).send({
      title: title,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(title);
    mongoTicketId = res.body._id;
  });

  test("should find ticket by id", async () => {
    const res = await request(app).get(TicketsEndpoints.TICKET_BY_ID).send({
      ticketId: mongoTicketId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(title);
    expect(res.body._id).toBe(mongoTicketId);
  });

  test("should add comments id", async () => {
    const res = await request(app).post(TicketsEndpoints.COMMENTS).send({
      ticketId: mongoTicketId,
      commentId: newCommentId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    const updatedTicket = res.body.find(
      (ticket: any) => ticket._id == mongoTicketId
    );
    expect(updatedTicket.title).toBe(title);

    expect(updatedTicket.comments.includes(newCommentId.toString())).toBe(true);
  });

  test("should delete comments id", async () => {
    const res = await request(app).delete(TicketsEndpoints.COMMENTS).send({
      ticketId: mongoTicketId,
      commentId: newCommentId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    const updatedTicket = res.body.find(
      (ticket: any) => ticket._id == mongoTicketId
    );
    expect(updatedTicket.title).toBe(title);
    expect(updatedTicket.comments.includes(newCommentId.toString())).toBe(
      false
    );
  });

  test("should delete ticket by id", async () => {
    const res = await request(app).delete(TicketsEndpoints.TICKET_BY_ID).send({
      ticketId: mongoTicketId,
    });
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
