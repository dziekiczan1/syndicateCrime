import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export interface IUserSignupData {
  email: string;
  password: string;
  username: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, username } = data as IUserSignupData;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8 ||
    !username
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 8 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  const existingUsername = await db
    .collection("users")
    .findOne({ username: username });

  if (existingUser || existingUsername) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    username: username,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
