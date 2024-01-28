import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import Project from "../mongoose/schemas/Project";

export const createProjectHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  const newProject = new Project(data);
  try {
    const savedProject = await newProject.save();
    return res.status(201).send(savedProject);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
