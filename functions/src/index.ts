import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/users/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    return res.status(201).json({ message: "User created", uid: userRecord.uid });
  } catch (err:any) {
    return res.status(500).json({ error: err.message });
  }
});

export const api = functions.https.onRequest(app);
