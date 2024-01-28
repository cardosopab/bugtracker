import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import companiesRouter from "./companies";
import projectsRouter from "./projects";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(companiesRouter);
router.use(projectsRouter);

export default router;
