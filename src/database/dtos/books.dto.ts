class BooksDTO {
  book: any;

  constructor(book: any) {
    this.book = book;
  }
}

//TODO: reemplazar any
export const bookAsDto = (data: any) => {
  if (data === null) {
    return [];
  }
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
};
