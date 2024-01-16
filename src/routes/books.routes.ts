import { Router } from "express";
import {
  deleteBookById,
  getBookById,
  getBooks,
  postBook,
  updateBookById,
} from "../controllers/books.controllers";

const booksRouter = Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", postBook);
booksRouter.put("/:id", updateBookById);
booksRouter.delete("/:id", deleteBookById);

export default booksRouter;
