import express, { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../constants";
import zod from "zod";
import { createUser } from "../prisma/queries/user/createUser";
const router: Router = express.Router();

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string().min(6),
});

router.post("/signup", async (req: Request, res: Response) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid request body",
    });
  }

  const { username, email, firstName, lastName, password } = req.body;
  try {
    const user = await createUser(
      username,
      email,
      firstName,
      lastName,
      password,
    );
    return res.status(HTTP_STATUS.CREATED).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
});

export { router };
