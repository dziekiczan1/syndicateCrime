import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: string }>
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = session.user!;
    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUser>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { action } = req.body;
    const bailOutCost = 100000;

    if (!user.prison) {
      user.prison = { isPrisoner: true, bailouts: 0, escapes: 0 };
    }

    if (action === "bailout") {
      if (user.defaultParams.money >= bailOutCost) {
        user.defaultParams.money -= bailOutCost;
        user.prison.isPrisoner = false;
        user.prison.bailouts++;
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
      }
    } else if (action === "escape") {
      if (user.defaultParams.energy >= 100) {
        user.defaultParams.energy -= 100;
        user.prison.isPrisoner = false;
        user.prison.escapes++;
      } else {
        return res.status(400).json({ error: "Not enough energy!" });
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: user });

    const { password, ...userWithoutPassword } = user;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
    } as IUser;

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error processing bank action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
