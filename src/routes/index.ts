import express, { Router } from "express";
import { router as userRouter } from "./user";
import { router as todosRouter } from "./todos";
const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/todos", todosRouter);

export { router };
