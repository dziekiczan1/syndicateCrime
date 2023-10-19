import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";
import { ObjectId } from "mongodb";

interface DecodedToken extends JwtPayload {
  userId: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const { token, password, confirmPassword } = req.body;

  const client = await connectToDatabase();
  const db = client.db();

  if (!token || !password || !confirmPassword) {
    return res.status(422).json({ message: "Invalid input." });
  }

  if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match.",
    });
  }

  let decodedToken: DecodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET
    ) as DecodedToken;
  } catch (error) {
    return res.status(401).json({
      message:
        "Link expired. Please go to the Forgot Password page and resend your email.",
    });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Token has expired." });
  }

  const userIdAsObjectId = new ObjectId(decodedToken.userId);

  const existingUser = await db
    .collection<IUser>("users")
    .findOne({ _id: userIdAsObjectId });

  if (!existingUser) {
    return res.status(400).json({ message: "No user with that id!" });
  }

  const hashedPassword = await hashPassword(password);

  await db
    .collection<IUser>("users")
    .updateOne(
      { _id: userIdAsObjectId },
      { $set: { password: hashedPassword } }
    );

  res.status(201).json({ message: "Password changed!" });
  client.close();
}

export default handler;
