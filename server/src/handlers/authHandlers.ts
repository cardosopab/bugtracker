import { Request, Response } from "express";
import SerializedUser from "../models/SerializedUser";

export const loginHandler = (
  req: Request & { user?: SerializedUser },
  res: Response
) => {
  // Assuming that req.user contains the authenticated user information
  const user = req.user;

  if (user) {
    const responseData: SerializedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      companyId: user.companyId,
    };

    res.status(200).json(responseData);
  } else {
    res.sendStatus(401);
  }
};

export const statusHandler = (
  req: Request & { user?: SerializedUser },
  res: Response
) => {
  const user = req.user;

  if (user) {
    const responseData: SerializedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      companyId: user.companyId,
    };

    res.status(200).json(responseData);
  } else {
    res.sendStatus(401);
  }
};

export const logoutHandler = (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};
