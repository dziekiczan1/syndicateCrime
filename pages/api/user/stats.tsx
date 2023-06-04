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
    strengthValue?: number;
    intelligenceValue?: number;
    enduranceValue?: number;
    charismaValue?: number;
    respectValue?: number;
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
    const {
      robberySuccessful,
      robberyMoney,
      message,
      strengthValue,
      intelligenceValue,
      enduranceValue,
      charismaValue,
      respectValue,
      ...defautlParams
    } = updatedStats;

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
        strengthValue: strengthValue,
        intelligenceValue: intelligenceValue,
        enduranceValue: enduranceValue,
        charismaValue: charismaValue,
        respectValue: respectValue,
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
            strengthValue,
            intelligenceValue,
            enduranceValue,
            charismaValue,
            respectValue,
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
      robberySuccessful: false,
    } as UpdatedStats;
  }

  const updatedStats = {
    ...stats,
    energy: Math.max(stats.energy - energyResCost, 0),
  };

  const robberySuccessful = isRobberySuccessful(successProbability);

  let robberyMoney = 0;
  let message;

  const minPrice = energyPointsCost.minPrice;
  const maxPrice = energyPointsCost.maxPrice;
  robberyMoney = generateRandomNumber(minPrice, maxPrice);

  const strengthValue = energyPointsCost.strength;
  const intelligenceValue = energyPointsCost.intelligence;
  const enduranceValue = energyPointsCost.endurance;
  const charismaValue = energyPointsCost.charisma;
  const respectValue = energyPointsCost.respect;

  if (robberySuccessful) {
    updatedStats.money += robberyMoney;
    updatedStats.strength += strengthValue;
    updatedStats.intelligence += intelligenceValue;
    updatedStats.endurance += enduranceValue;
    updatedStats.charisma += charismaValue;
    updatedStats.respect += respectValue;
    message = getFunnyMessage(true);
  } else {
    updatedStats.money -= robberyMoney;
    updatedStats.money = Math.max(updatedStats.money, 0);
    updatedStats.respect = Math.max(stats.respect - respectValue, 0);
    message = getFunnyMessage(false);
  }
  return {
    ...updatedStats,
    robberySuccessful,
    robberyMoney,
    message,
    strengthValue,
    intelligenceValue,
    enduranceValue,
    charismaValue,
    respectValue,
  } as UpdatedStats;
}

function getFunnyMessage(isSuccess: boolean): string {
  const successMessages = [
    "You hit the jackpot! Time to buy that private island.",
    "You're on a roll! The money keeps flowing.",
    "Congratulations! You're a master thief.",
    "Success! The stars are aligned in your favor.",
    "You've unlocked the secrets of successful robbery!",
  ];

  const failureMessages = [
    "Oops! Better luck next time.",
    "You tripped on your own shoelaces. Not your day.",
    "The universe has a strange sense of humor. Keep trying!",
    "Failure is just a stepping stone to success.",
    "Learn from your mistakes and try again.",
  ];

  const messages = isSuccess ? successMessages : failureMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function isRobberySuccessful(successProbability: number): boolean {
  if (successProbability === 100) {
    return true;
  }

  const randomNumber = Math.random() * 100;

  return randomNumber < successProbability;
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
