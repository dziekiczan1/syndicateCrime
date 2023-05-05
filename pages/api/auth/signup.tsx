import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export interface IUserSignupData {
  email: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const { email, password } = data as IUserSignupData;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 8 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
