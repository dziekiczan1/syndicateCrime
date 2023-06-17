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
    let totalEnergyPoints = 0;
    let totalCharismaPoints = 0;
    let totalStrengthPoints = 0;
    let totalEndurancePoints = 0;

    for (const drug of drugs) {
      const {
        quantity,
        cost,
        energyPoints,
        charismaPoints,
        strengthPoints,
        endurancePoints,
      } = drug;

      const drugCost = calculateCost(cost, quantity);
      totalCost += drugCost;

      if (energyPoints) {
        const energyPointsToAdd = calculatePoints(energyPoints, quantity);
        totalEnergyPoints += energyPointsToAdd;
        updatedUser.defaultParams.energy += energyPointsToAdd;
      }

      if (charismaPoints) {
        const charismaPointsToAdd = calculatePoints(charismaPoints, quantity);
        totalCharismaPoints += charismaPointsToAdd;
        updatedUser.defaultParams.charisma += charismaPointsToAdd;
      }

      if (strengthPoints) {
        const strengthPointsToAdd = calculatePoints(strengthPoints, quantity);
        totalStrengthPoints += strengthPointsToAdd;
        updatedUser.defaultParams.strength += strengthPointsToAdd;
      }

      if (endurancePoints) {
        const endurancePointsToAdd = calculatePoints(endurancePoints, quantity);
        totalEndurancePoints += endurancePointsToAdd;
        updatedUser.defaultParams.endurance += endurancePointsToAdd;
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
