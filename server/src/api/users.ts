import express from "express";

const router = express.Router();

type CreateResponse = string[];

router.post<{}, CreateResponse>("/create", (req, res) => {
  res.status(201).json(["hello, world!"]);
});

export default router;
