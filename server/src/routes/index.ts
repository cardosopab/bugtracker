import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import companyRouter from "./company";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(companyRouter);

export default router;
