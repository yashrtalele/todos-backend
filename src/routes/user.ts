import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import zod from "zod";
const prisma = new PrismaClient();
const router: Router = express.Router();

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string().min(6),
});

export { router };
