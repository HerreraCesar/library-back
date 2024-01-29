import express from "express";
import morgan from "morgan";
import { config } from "./config";
import booksRouter from "./routes/books.routes";
import { Request, Response } from "express";

// ------------- EXPRESS ------------- //
const app = express();
app.use(express.json());

// ------------- LOGGERS ------------- //
app.use(morgan("dev"));

// ------------- ROUTES ------------- //
app.get("/api", (req: Request, res: Response) =>
  res.json("Welcome to the Library REST API")
);
app.use("/api/books", booksRouter);

// ------------- INITIALIZATION ------------- //
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
