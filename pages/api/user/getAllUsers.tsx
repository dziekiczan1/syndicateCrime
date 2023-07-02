import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { IUser } from "@/store/user-context";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser[] | { error: string }>
) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUser>("users");
    const users = await usersCollection.find({}).toArray();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const serializedUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        _id: user._id.toString(),
      };
    });

    client.close();
    return res.status(200).json(serializedUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
