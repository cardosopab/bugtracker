import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";

const router = Router();

router.use(authRouter);
router.use(usersRouter);

export default router;
