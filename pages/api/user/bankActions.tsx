import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithBank extends IUser {
  bank?: number | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserWithBank | { error: string }>
) {
  let successMessage;

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = session.user!;
    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUserWithBank>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { action, bankmoney } = req.body.requestData;
    const amount = Number(bankmoney);
    const energyCost = 2;

    if (user.defaultParams.energy < energyCost) {
      return res.status(400).json({ error: "Not enough energy" });
    }

    if (action === "stash") {
      if (user.defaultParams.money >= amount) {
        user.defaultParams.money -= amount;
        user.defaultParams.energy -= energyCost;
        user.bank = user.bank || 0;
        user.bank += amount;
        successMessage = "You have successfully stored money!";
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
      }
    } else if (action === "withdraw") {
      if (user.bank && user.bank >= amount) {
        user.bank -= amount;
        user.defaultParams.energy -= energyCost;
        user.defaultParams.money += amount;
        successMessage = "You have successfully withdrawn money!";
      } else {
        return res.status(400).json({ error: "Invalid withdrawal amount" });
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: user });

    const { password, ...userWithoutPassword } = user;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      message: successMessage,
    } as IUser;

    client.close();
    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error processing bank action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
