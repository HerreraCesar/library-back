import { initializeApp } from "firebase-admin/app";
import { config } from "../../config";
import { credential } from "firebase-admin";
import { Firestore, getFirestore } from "firebase-admin/firestore";

export class FirestoreManager {
  private db: Firestore;
  private collection: string;
  private static initialized = false;
  private static db: Firestore;

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

  async createDocument({
    data,
  }: {
    data: Record<string, any>;
  }): Promise<string> {
    try {
      const response = await this.db.collection(this.collection).add(data);
      console.log("Response: ", response);
      return "Documento agregado con éxito";
    } catch (error) {
      console.log(error);
    }
  }

  async readDocument({
    id,
  }: {
    id: string;
  }): Promise<Record<string, any> | string> {
    try {
      const documentSnapshot = await this.db
        .collection(this.collection)
        .doc(id)
        .get();
      if (documentSnapshot.exists) {
        console.log(documentSnapshot);
        return documentSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      throw Error;
    }
  }

  async updateDocument({
    id,
    data,
  }: {
    id: string;
    data: Record<string, any>;
  }): Promise<string> {
    try {
      const response = await this.db
        .collection(this.collection)
        .doc(id)
        .update(data);
      console.log(response);
      return "Documento actualizado con éxito";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDocument({ id }: { id: string }): Promise<string> {
    try {
      const response = await this.db
        .collection(this.collection)
        .doc(id)
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

      //TODO: reemplazar any
      querySnapshot.forEach((doc: any) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      console.log(error);
    }
  }
}
