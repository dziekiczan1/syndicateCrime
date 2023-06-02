import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface IUserWithRobbery extends IUser {
  defaultParams: {
    class: string;
    morale: string;
    respect: number;
    energy: number;
    life: number;
    addiction: number;
    intelligence: number;
    strength: number;
    endurance: number;
    charisma: number;
    money: number;
    robberySuccessful?: boolean;
    moneyEarned?: number;
    message?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserWithRobbery | { error: string }>
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

    const selectedPlace = req.body.selectedPlace;
    const updatedStats = await calculateUpdatedStats(
      user.defaultParams,
      selectedPlace
    );

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { defaultParams: updatedStats } }
    );

    const { password, ...userWithoutPassword } = user;

    const serializedUser: IUserWithRobbery = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      defaultParams: {
        ...updatedStats,
        robberySuccessful: updatedStats.robberySuccessful,
        moneyEarned: updatedStats.moneyEarned,
      },
    };

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function calculateUpdatedStats(
  stats: IUser["defaultParams"],
  selectedPlace: string
): Promise<IUserWithRobbery["defaultParams"]> {
  const energyPointsCost = await getEnergyPointsCost(stats, selectedPlace);
  const energyResCost = energyPointsCost.energyCost;
  const successProbability = energyPointsCost.successProbability;

  if (stats.energy < energyResCost) {
    return {
      ...stats,
      message: "Insufficient energy for the robbery",
    };
  }

  const updatedStats = {
    ...stats,
    energy: Math.max(stats.energy - energyResCost, 0),
  };

  const robberySuccessful = isRobberySuccessful(successProbability);
  let moneyEarned = 0;

  if (robberySuccessful) {
    const minPrice = energyPointsCost.minPrice;
    const maxPrice = energyPointsCost.maxPrice;
    moneyEarned = generateRandomNumber(minPrice, maxPrice);
    console.log("moneyEarned", moneyEarned);
    updatedStats.money += moneyEarned;
  } else {
    updatedStats.respect = stats.respect - 1;
  }
  return { ...updatedStats, robberySuccessful, moneyEarned };
}

function isRobberySuccessful(successProbability: number): boolean {
  if (successProbability === 100) {
    return true;
  }
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const adjustedSuccessProbability = Math.floor(
    randomNumber / successProbability
  );

  return adjustedSuccessProbability < 100;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getEnergyPointsCost(
  stats: IUser["defaultParams"],
  selectedPlace: string
): Promise<any> {
  try {
    const response = await fetch("http://localhost:3000/api/user/places", {
      method: "POST",
      body: JSON.stringify({ respect: stats.respect }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const placeEnergyCosts = await response.json();

      const selectedPlaceObject = placeEnergyCosts.find(
        (place: { name: string }) => place.name === selectedPlace
      );

      if (selectedPlaceObject) {
        return selectedPlaceObject;
      } else {
        console.error("Selected place not found in placeEnergyCosts");
      }
    } else {
      console.error("Error fetching place energy costs:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching place energy costs:", error);
  }

  return 0;
}
