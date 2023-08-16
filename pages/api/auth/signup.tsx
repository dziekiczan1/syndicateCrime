import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export interface IUserSignupData {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

export interface IUser extends IUserSignupData {
  defaultParams: {
    class: string;
    gang?: string;
    respect: number;
    energy: number;
    life: number;
    addiction: number;
    intelligence: number;
    strength: number;
    endurance: number;
    charisma: number;
    money: number;
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body as IUserSignupData;

  if (
    !data.email ||
    !data.email.includes("@") ||
    !data.password ||
    data.password.trim().length < 8 ||
    !data.username ||
    !data.avatar
  ) {
    res.status(422).json({
      message:
        "Oops! There seems to be an issue with your input. Please make sure your password is at least 8 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db
    .collection<IUser>("users")
    .findOne({ email: data.email });
  const existingUsername = await db
    .collection<IUser>("users")
    .findOne({ username: data.username });

  if (existingUser || existingUsername) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(data.password);

  const defaultParams = {
    class: "Begginer",
    respect: 1,
    energy: 100,
    life: 100,
    addiction: 0,
    intelligence: 10,
    strength: 10,
    endurance: 10,
    charisma: 10,
    money: 10,
  };

  const user: IUser = {
    email: data.email,
    password: hashedPassword,
    username: data.username,
    avatar: data.avatar,
    defaultParams: defaultParams,
  };

  const result = await db.collection<IUser>("users").insertOne(user);

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
