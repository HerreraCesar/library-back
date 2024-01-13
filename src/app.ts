import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { booksDao } from "./database";

const app = express();

(async () => await booksDao.getAllDocuments())();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
