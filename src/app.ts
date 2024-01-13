import express from "express";
import morgan from "morgan";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";
import { config } from "./config";

const app = express();
const firebaseApp = initializeApp({
  credential: credential.cert(config.firebase),
});
const db = getFirestore(firebaseApp);
app.use(express.json());
app.use(morgan("dev"));

const docRef = db.collection("books").doc("narnia");

(async () => {
  // await docRef.set({
  //   title: "The Lion, the Witch and the Wardrobe",
  //   author: "Clive Staples Lewis",
  //   year: 1950,
  // });

  const snapshot = await db.collection("books").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
