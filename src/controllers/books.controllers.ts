import { booksCollection } from "../database";
import { bookAsDto } from "../database/dtos/books.dto";
import { Request, Response } from "express";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const data = await booksCollection.getAllDocuments();
    res.json(bookAsDto(data));
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const data = await booksCollection.readDocument({ id: bookId });
    res.json(bookAsDto(data));
  } catch (error) {
    res.status(500).json({ message: `error: ${error.toString()}` });
  }
};

export const postBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const data = await booksCollection.createDocument({ data: book });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const data = await booksCollection.updateDocument({
      id: bookId,
      data: updatedBook,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const data = await booksCollection.deleteDocument({
      id: bookId,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
