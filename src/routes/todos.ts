import { AuthRequest } from "../types";
import express, { Response, Router } from "express";
import { HTTP_STATUS } from "../constants";
import { createTodo } from "../prisma/queries/todos/createTodo";
import { getTodo } from "../prisma/queries/todos/getTodo";
import { updateTodo } from "../prisma/queries/todos/updateTodo";
import { completeTodo } from "../prisma/queries/todos/completeTodo";
import { deleteTodo } from "../prisma/queries/todos/deleteTodo";
import { TodoSchema } from "../schemas/todos/todo.schema";
import { authMiddleware } from "../middleware/user";

const router: Router = express.Router();

router.post(
  "/create",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { success } = TodoSchema.safeParse(req.body);
    if (!success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid request body",
      });
    }

    const { title, description } = req.body;
    const userId = req.userId;
    try {
      const todo = await createTodo(title, description, userId as number);
      return res.status(HTTP_STATUS.CREATED).json({
        message: "Todo created successfully",
        todo,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: (error as Error).message,
      });
    }
  },
);

router.get("/all", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  try {
    const todos = await getTodo(userId as number);
    return res.status(HTTP_STATUS.OK).json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
});

router.put(
  "/update",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { success } = TodoSchema.safeParse(req.body);
    if (!success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid request body",
      });
    }

    const { id, title, description } = req.body;
    try {
      const todo = await updateTodo(id, title, description);
      return res.status(HTTP_STATUS.OK).json({
        message: "Todo updated successfully",
        todo,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: (error as Error).message,
      });
    }
  },
);

router.put(
  "/complete",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const todo = await completeTodo(req.body.id);
      return res.status(HTTP_STATUS.OK).json({
        message: "Todo completed successfully",
        todo,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: (error as Error).message,
      });
    }
  },
);

router.delete(
  "/delete",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const todo = await deleteTodo(req.body.id);
      return res.status(HTTP_STATUS.OK).json({
        message: "Todo deleted successfully",
        todo,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: (error as Error).message,
      });
    }
  },
);

export { router };
