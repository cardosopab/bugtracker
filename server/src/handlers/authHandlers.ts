import { Request, Response } from "express";

export const loginHandler = (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const statusHandler = (req: Request, res: Response) => {
  if (req.user) {
    res.sendStatus(200);
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
