import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { connectToDatabase } from "@/lib/db";
import { calculatePlaceInformation } from "@/lib/robbery";
import {
  generateRandomNumber,
  getRobberyResultMessage,
  isRobberySuccessfull,
} from "@/lib/stats";
import { IUser } from "@/store/user-context";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithRobbery extends IUser {
  lastRobbery: {
    robberySuccessfull?: boolean;
    robberyMoney?: number;
    message?: string;
    strengthValue?: number;
    intelligenceValue?: number;
    enduranceValue?: number;
    charismaValue?: number;
    respectValue?: number;
  };
  prison?: {
    isPrisoner: boolean;
    escapes: number;
    bailouts: number;
  };
}

type UpdatedStats = IUserWithRobbery["lastRobbery"] &
  IUserWithRobbery["defaultParams"] &
  IUserWithRobbery["prison"];

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
      selectedPlace,
      user.prison
    );

    const { password, ...userWithoutPassword } = user;
    const {
      robberySuccessfull,
      robberyMoney,
      message,
      strengthValue,
      intelligenceValue,
      enduranceValue,
      charismaValue,
      respectValue,
      isPrisoner,
      escapes,
      bailouts,
      ...defautlParams
    } = updatedStats;

    const serializedUser: IUserWithRobbery = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      defaultParams: {
        ...defautlParams,
      },
      lastRobbery: {
        robberySuccessfull: robberySuccessfull,
        robberyMoney: robberyMoney,
        message: message,
        strengthValue: strengthValue,
        intelligenceValue: intelligenceValue,
        enduranceValue: enduranceValue,
        charismaValue: charismaValue,
        respectValue: respectValue,
      },
      prison: {
        isPrisoner: isPrisoner,
        escapes: escapes || 0,
        bailouts: bailouts || 0,
      },
    };

    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          defaultParams: { ...defautlParams },
          lastRobbery: {
            robberySuccessfull,
            robberyMoney,
            message,
            strengthValue,
            intelligenceValue,
            enduranceValue,
            charismaValue,
            respectValue,
          },
          prison: {
            isPrisoner: isPrisoner,
            escapes: escapes,
            bailouts: bailouts,
          },
        },
      }
    );

    client.close();
    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function calculateUpdatedStats(
  stats: IUser["defaultParams"],
  selectedPlace: string,
  prison?: IUserWithRobbery["prison"]
): Promise<UpdatedStats> {
  const energyPointsCost = await getRobberyPlaceInfo(stats, selectedPlace);
  const energyResCost = energyPointsCost.energyCost;
  const successProbability = energyPointsCost.successProbability;

  if (stats.energy < energyResCost) {
    return {
      ...stats,
      message: "Insufficient energy for the robbery",
      robberySuccessfull: false,
    } as UpdatedStats;
  }

  const updatedStats = {
    ...stats,
    energy: Math.max(stats.energy - energyResCost, 0),
  };

  const robberySuccessfull = isRobberySuccessfull(successProbability);

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

  if (robberySuccessfull) {
    updatedStats.money += robberyMoney;
    updatedStats.strength += strengthValue;
    updatedStats.intelligence += intelligenceValue;
    updatedStats.endurance += enduranceValue;
    updatedStats.charisma += charismaValue;
    updatedStats.respect += respectValue;
    message = getRobberyResultMessage(true);
  } else {
    updatedStats.money -= robberyMoney;
    updatedStats.money = Math.max(updatedStats.money, 0);
    updatedStats.respect = Math.max(stats.respect - respectValue, 1);
    message = getRobberyResultMessage(false);

    if (updatedStats.addiction > 80) {
      const isPrisoner = Math.random() < 0.5;
      prison = {
        isPrisoner: isPrisoner,
        escapes: prison?.escapes || 0,
        bailouts: prison?.bailouts || 0,
      };
      message = getRobberyResultMessage(false, true);
    }
  }
  return {
    ...updatedStats,
    robberySuccessfull,
    robberyMoney,
    message,
    strengthValue,
    intelligenceValue,
    enduranceValue,
    charismaValue,
    respectValue,
    ...prison,
  } as UpdatedStats;
}

async function getRobberyPlaceInfo(
  stats: IUser["defaultParams"],
  selectedPlace: string
): Promise<any> {
  try {
    const placeInformationData = calculatePlaceInformation(
      stats.respect,
      stats.addiction
    );

    const selectedPlaceObject = placeInformationData.find(
      (place: { name: string }) => place.name === selectedPlace
    );

    if (selectedPlaceObject) {
      return selectedPlaceObject;
    } else {
      console.error("Selected place not found in placeInformationData");
    }
  } catch (error) {
    console.error("Error calculating place information:", error);
  }

  return null;
}
