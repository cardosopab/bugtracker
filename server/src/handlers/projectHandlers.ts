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

export const readProjectByNameHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const project = await Project.findOne(data);
    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readProjectByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const project = await Project.findById(data);
    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addUserToProjectHandler = async (
  req: Request,
  res: Response
) => {};

export const deleteUserFromProjectHandler = async (
  req: Request,
  res: Response
) => {};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    Project.findByIdAndDelete(data.projectId);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
