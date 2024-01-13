import { initializeApp } from "firebase-admin/app";
import { config } from "../../config";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export class FirestoreManager {
  private db: FirebaseFirestore.Firestore;
  private collection: string;
  private static initialized = false;
  private static db: FirebaseFirestore.Firestore;

  static initializeApp() {
    if (!FirestoreManager.initialized) {
      try {
        initializeApp({
          credential: credential.cert(config.firebase),
        });
        console.log("Database successfully connected");
        FirestoreManager.initialized = true;
        FirestoreManager.db = getFirestore();
      } catch (error) {
        console.log(error);
      }
    }
  }

  constructor(collection: string) {
    FirestoreManager.initializeApp();
    this.db = FirestoreManager.db;
    this.collection = collection;
  }

  async createDocument(document: Record<string, any>): Promise<string> {
    try {
      const response = await this.db.collection(this.collection).add(document);
      console.log("Response: ", response);
      return "Documento agregado con éxito";
    } catch (error) {
      console.log(error);
    }
  }

  async readDocument(
    documentId: string
  ): Promise<Record<string, any> | string> {
    try {
      const documentSnapshot = await this.db
        .collection(this.collection)
        .doc(documentId)
        .get();
      if (documentSnapshot.exists) {
        console.log(documentSnapshot);
        return documentSnapshot.data();
      } else {
        return "No se encontró el documento";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocument(
    documentId: string,
    newData: Record<string, any>
  ): Promise<string> {
    try {
      const response = await this.db
        .collection(this.collection)
        .doc(documentId)
        .update(newData);
      console.log(response);
      return "Documento actualizado con éxito";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDocument(documentId: string): Promise<string> {
    try {
      const response = await this.db
        .collection(this.collection)
        .doc(documentId)
        .delete();
      console.log(response);
      return "Documento eliminado con éxito";
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDocuments(): Promise<Record<string, any>[]> {
    try {
      const querySnapshot = await this.db.collection(this.collection).get();
      const documents: Record<string, any>[] = [];

      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });

      console.log(documents);

      return documents;
    } catch (error) {
      console.log(error);
    }
  }
}
