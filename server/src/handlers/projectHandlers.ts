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

export const addPersonnelToArrayHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  const { projectId, personnelId } = data;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    project.personnel.push(personnelId);
    const updatedProject = await project.save();
    return res.status(200).send(updatedProject);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readProjectByNameHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const project = await Project.findOne(data);

    if (!project) {
      return res.status(404).send("Project not found");
    }

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
    const project = await Project.findById(data.projectId);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    Project.findByIdAndDelete(data.projectId);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deletePersonnelFromArrayHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  const { projectId, personnelId } = data;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    const index = project.personnel.indexOf(personnelId);
    if (index === -1) return res.status(200).send(project);

    project.personnel.splice(index, 1);
    const updatedProject = await project.save();
    return res.status(200).send(updatedProject);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
