import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import companiesRouter from "./companies";
import projectsRouter from "./projects";
import ticketsRouter from "./tickets";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(companiesRouter);
router.use(projectsRouter);
router.use(ticketsRouter);

export default router;
