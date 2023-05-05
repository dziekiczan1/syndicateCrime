import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

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

  db.collection("users").insertOne({
    email: email,
    password: password,
  });
}

export default handler;
