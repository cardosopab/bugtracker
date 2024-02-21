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

    const companies = await Company.find().sort({ createdAt: -1 });
    if (!companies) return res.status(404).send("Companies not found");

    return res.status(200).send(companies);
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
  const { companyId, personnelId } = data;

  try {
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).send("Company not found");

    company.personnel.push(personnelId);
    const updatedCompany = await company.save();

    const companies = await Company.find();
    if (!companies) return res.status(404).send("Companies not found");

    return res.status(200).send(companies);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readAllCompaniesHandler = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    if (!companies) return res.status(404).send("Companies not found");

    return res.status(200).send(companies);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readCompanyByNameHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const company = await Company.findOne(data);
    if (!company) return res.status(404).send("Company not found");

    return res.status(200).send(company);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const readCompanyByIdHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const company = await Company.findById(data.companyId);
    if (!company) return res.status(404).send("Company not found");

    return res.status(200).send(company);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteCompanyHandler = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  try {
    const deletedCompany = await Company.findByIdAndDelete(data.companyId);
    const companies = await Company.find();
    if (!companies) return res.status(404).send("Companies not found");

    return res.status(200).send(companies);
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
  const { companyId, personnelId } = data;

  try {
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).send("Company not found");

    const index = company.personnel.indexOf(personnelId);
    if (index === -1) return res.status(200).send(company);

    company.personnel.splice(index, 1);
    const updatedCompany = await company.save();

    const companies = await Company.find();
    if (!companies) return res.status(404).send("Companies not found");

    return res.status(200).send(companies);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
