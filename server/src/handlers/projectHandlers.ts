import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import Project from "../mongoose/schemas/Project";
import User from "../mongoose/schemas/User";

export const createProjectHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  const newProject = new Project(data);
  try {
    const savedProject = await newProject.save();

    const projects = await Project.find();
    if (!projects) return res.status(404).send("Project not found");

    return res.status(201).send(projects);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const addPersonnelByEmailHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  const { projectId, email } = data;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    const user = await User.findOne({ email: email }).select(
      "_id, name, email, role"
    );
    if (!user) return res.status(404).send("User not found");

    project.personnel.push(user._id);
    const updatedProject = await project.save();

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addPersonnelToArrayHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  const { projectId, personnelId } = data;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    project.personnel.push(personnelId);
    const updatedProject = await project.save();

    const projects = await Project.find();
    if (!projects) return res.status(404).send("Project not found");

    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readAllProjectsHandler = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    if (!projects) return res.status(404).send("Project not found");

    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readProjectByCompanyHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const projects = await Project.find(data);
    if (!projects) return res.status(404).send("Projects not found");

    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readPaginatedProjectsHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const { companyId } = matchedData(req);
  let { page, pageSize } = matchedData(req);

  try {
    page = parseInt(page as string) || 1;
    pageSize = parseInt(pageSize as string) || 10;

    const totalCount = await Project.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    if (page > totalPages) {
      return res.status(404).send("Page not found");
    }

    const skip = (page - 1) * pageSize;

    const projects = await Project.find({ companyId: companyId })
      .skip(skip)
      .limit(pageSize);

    console.log("backend", projects.length);
    return res.status(200).json({
      projects,
      page,
      totalPages,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readProjectByNameHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const project = await Project.findOne(data);
    if (!project) return res.status(404).send("Project not found");

    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readProjectByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const project = await Project.findById(data.projectId);
    if (!project) return res.status(404).send("Project not found");

    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const deletedProject = await Project.findByIdAndDelete(data.projectId);
    if (!deletedProject) return res.status(404).send("Project not found");

    const projects = await Project.find();
    if (!projects) return res.status(404).send("Project not found");

    return res.status(200).send(projects);
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
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  const { projectId, personnelId } = data;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    const index = project.personnel.indexOf(personnelId);
    if (index === -1) return res.status(200).send(project);

    project.personnel.splice(index, 1);
    const updatedProject = await project.save();

    const projects = await Project.find();
    if (!projects) return res.status(404).send("Project not found");

    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
