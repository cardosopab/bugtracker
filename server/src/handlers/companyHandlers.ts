import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import Company from "../mongoose/schemas/Company";

export const createCompanyHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  const newCompany = new Company(data);
  try {
    const savedCompany = await newCompany.save();
    return res.status(201).send(savedCompany);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
