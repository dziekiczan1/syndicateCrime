import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: string }>
) {
  let successMessage;

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
    const solutionCost = 10000;
    const injectionCost = 50000;

    if (action === "solution") {
      if (
        user.defaultParams.money >= solutionCost &&
        user.defaultParams.energy >= 20
      ) {
        user.defaultParams.money -= solutionCost;
        user.defaultParams.energy -= 20;
        user.defaultParams.addiction -= 20;

        user.defaultParams.addiction = Math.max(
          user.defaultParams.addiction,
          0
        );
        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
      }
    } else if (action === "injection") {
      if (user.defaultParams.money >= injectionCost) {
        user.defaultParams.money -= injectionCost;
        user.defaultParams.addiction = 0;
        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
      }
    } else if (action === "pills") {
      if (user.defaultParams.energy >= 100) {
        user.defaultParams.energy -= 100;
        user.defaultParams.addiction = 0;
        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Not enough energy!" });
      }
    } else if (action === "bandaid") {
      if (
        user.defaultParams.money >= solutionCost &&
        user.defaultParams.energy >= 20
      ) {
        user.defaultParams.money -= solutionCost;
        user.defaultParams.energy -= 20;
        user.defaultParams.life += 20;

        if (user.defaultParams.life > 100) {
          user.defaultParams.life = 100;
        }

        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
      }
    } else if (action === "firstaidkit") {
      if (user.defaultParams.energy >= 100) {
        user.defaultParams.energy -= 100;
        user.defaultParams.life = 100;
        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Not enough energy!" });
      }
    } else if (action === "lifeelixir") {
      if (user.defaultParams.money >= injectionCost) {
        user.defaultParams.money -= injectionCost;
        user.defaultParams.life = 100;
        successMessage = "You start to feel better now.";
      } else {
        return res.status(400).json({ error: "Insufficient funds" });
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
    console.error("Error processing hospital action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
