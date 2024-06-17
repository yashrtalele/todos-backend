import express, { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../constants";
import zod from "zod";
import { createUser } from "../prisma/queries/user/createUser";
import { getUser } from "../prisma/queries/user/getUser";
import { UserSignUpSchema } from "../schemas/user/user.signup.schema";
import { UserSignInSchema } from "../schemas/user/user.signin.schema";
const router: Router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { success } = UserSignUpSchema.safeParse(req.body);
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

router.post("/signin", async (req: Request, res: Response) => {
  const { success } = UserSignInSchema.safeParse(req.body);
  if (!success) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid request body",
    });
  }
  const { username, password } = req.body;
  try {
    const user = await getUser(username, password);
    if (user === null) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "User does not exist",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
});

export { router };
