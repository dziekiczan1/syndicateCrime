import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export interface IUserSignupData {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, username, avatar } = data as IUserSignupData;

  console.log(data);

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8 ||
    !username ||
    !avatar
  ) {
    res.status(422).json({
      message:
        "Oops! There seems to be an issue with your input. Please make sure your password is at least 8 characters long.",
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
    avatar: avatar,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
