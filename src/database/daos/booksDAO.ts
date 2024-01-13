import { FirestoreManager } from "../containers/firebase";

class BooksDAO extends FirestoreManager {
  constructor() {
    super("books");
  }
}

export default BooksDAO;
