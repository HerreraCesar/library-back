class BooksDTO {
  book: any;

  constructor(book: any) {
    this.book = book;
  }
}

//TODO: reemplazar any
export const bookAsDto = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((book) => new BooksDTO(book));
  } else {
    return new BooksDTO(data);
  }
};
