import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";
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

    const { drugs } = req.body;

    const updatedUser = { ...user };
    let totalCost = 0;

    for (const drug of drugs) {
      const { quantity, cost } = drug;

      const drugCost = calculateCost(cost, quantity);
      totalCost += drugCost;

      type Stat =
        | "energy"
        | "charisma"
        | "strength"
        | "endurance"
        | "intelligence"
        | "respect"
        | "addiction";

      const statMappings: [Stat, keyof typeof drug][] = [
        ["energy", "energyPoints"],
        ["charisma", "charismaPoints"],
        ["strength", "strengthPoints"],
        ["endurance", "endurancePoints"],
        ["intelligence", "intelligencePoints"],
        ["respect", "respectPoints"],
        ["addiction", "addictionPoints"],
      ];

      for (const [stat, statProperty] of statMappings) {
        const points = drug[statProperty];
        if (points) {
          const pointsToAdd = calculatePoints(points, quantity);

          if (stat === "energy") {
            const updatedPoints = Math.min(
              updatedUser.defaultParams[stat] + pointsToAdd,
              100
            );
            updatedUser.defaultParams[stat] = updatedPoints;
          } else {
            updatedUser.defaultParams[stat] += pointsToAdd;
          }
        }
      }
    }

    if (user.defaultParams.money < totalCost) {
      res.status(400).json({ error: "Not enough money to buy the drugs" });
      client.close();
      return;
    }

    updatedUser.defaultParams.money -= totalCost;

    await usersCollection.updateOne(
      { email: email as string },
      { $set: updatedUser }
    );

    const { password, ...userWithoutPassword } = updatedUser;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
    } as IUser;

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

function calculateCost(cost: number, quantity: number): number {
  return cost * quantity;
}

function calculatePoints(points: number, quantity: number): number {
  return points * quantity;
}
