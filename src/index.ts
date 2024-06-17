import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { router as rootRouter } from "./routes/index";
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express + Prisma!");
});

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 🚀`);
});
