import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import User from "../mongoose/schemas/User";
import { hashPassword } from "../utils/helpers";
import Project from "../mongoose/schemas/Project";

export const createUserHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    if (!savedUser) return res.status(404).send("User not created");

    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const readAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("name email role companyId");
    if (!users) return res.status(404).send("Users not found");

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readAllProjectUsersHandler = async (
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
    const project = await Project.findById(data.projectId);
    if (!project) return res.status(404).send("Project not found");

    const users = await User.find({ _id: { $in: project.personnel } }).select(
      "name email role"
    );

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readAllCompanyUsersHandler = async (
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
    const users = await User.find({ companyId: data.companyId }).select(
      "name email role companyId"
    );
    if (!users) return res.status(404).send("Users not found");

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readUserByEmailHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const user = await User.findOne(data);
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readUserByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  try {
    const user = await User.findById(data.userId);
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const updateUserByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  try {
    // Create a new object without the userId field
    const userDataWithoutId = { ...data };
    delete userDataWithoutId.userId;

    const updatedUser = await User.findOneAndUpdate(
      { _id: data.userId },
      { $set: userDataWithoutId },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).send("User not found or no changes made.");

    const users = await User.find().select("name email role companyId");
    if (!users) return res.status(404).send("Users not found");

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    const user = await User.findByIdAndDelete(data.userId);
    if (!user) return res.status(404).send("User not found");

    const users = await User.find().select("name email role companyId");
    if (!users) return res.status(404).send("Users not found");

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
