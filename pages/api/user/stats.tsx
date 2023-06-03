import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";
import { authOptions } from "../auth/[...nextauth]";

interface IUserWithRobbery extends IUser {
  lastRobbery: {
    robberySuccessful?: boolean;
    robberyMoney?: number;
    message?: string;
  };
}

type UpdatedStats = IUserWithRobbery["lastRobbery"] &
  IUserWithRobbery["defaultParams"];

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
    const usersCollection = client.db().collection<IUserWithRobbery>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const selectedPlace = req.body.selectedPlace;
    const updatedStats = await calculateUpdatedStats(
      user.defaultParams,
      selectedPlace
    );

    const { password, ...userWithoutPassword } = user;
    const { robberySuccessful, robberyMoney, message, ...defautlParams } =
      updatedStats;

    const serializedUser: IUserWithRobbery = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      defaultParams: {
        ...defautlParams,
      },
      lastRobbery: {
        robberySuccessful: robberySuccessful,
        robberyMoney: robberyMoney,
        message: message,
      },
    };

    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          defaultParams: { ...defautlParams },
          lastRobbery: {
            robberySuccessful,
            robberyMoney,
            message,
          },
        },
      }
    );

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function calculateUpdatedStats(
  stats: IUser["defaultParams"],
  selectedPlace: string
): Promise<UpdatedStats> {
  const energyPointsCost = await getRobberyPlaceInfo(stats, selectedPlace);
  const energyResCost = energyPointsCost.energyCost;
  const successProbability = energyPointsCost.successProbability;

  if (stats.energy < energyResCost) {
    return {
      ...stats,
      message: "Insufficient energy for the robbery",
    } as UpdatedStats;
  }

  const updatedStats = {
    ...stats,
    energy: Math.max(stats.energy - energyResCost, 0),
  };

  const robberySuccessful = isRobberySuccessful(successProbability);

  let robberyMoney = 0;
  const minPrice = energyPointsCost.minPrice;
  const maxPrice = energyPointsCost.maxPrice;
  robberyMoney = generateRandomNumber(minPrice, maxPrice);

  if (robberySuccessful) {
    updatedStats.money += robberyMoney;
  } else {
    updatedStats.money -= robberyMoney;
    updatedStats.money = Math.max(updatedStats.money, 0);
    updatedStats.respect = Math.max(stats.respect - 1, 0);
  }
  return {
    ...updatedStats,
    robberySuccessful,
    robberyMoney,
  } as UpdatedStats;
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

async function getRobberyPlaceInfo(
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

  return null;
}
