import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import User from "../mongoose/schemas/User";
import { hashPassword } from "../utils/helpers";

export const createUserHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const readUserByEmailHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const user = await User.findOne(data);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    await User.findByIdAndDelete(data.userdId);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
