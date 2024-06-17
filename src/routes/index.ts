import express, { Router } from "express";
import { router as userRouter } from "./user";
const router: Router = express.Router();

router.use("/user", userRouter);

export { router };
