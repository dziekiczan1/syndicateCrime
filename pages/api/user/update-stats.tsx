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

    // Calculate the updated stats based on the selected place and user's respect points

    console.log(req.body);

    const selectedPlace = req.body.selectedPlace;
    const updatedStats = calculateUpdatedStats(
      user.defaultParams,
      selectedPlace
    );

    // Update the user's stats in the database
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { defaultParams: updatedStats } }
    );

    const serializedUser: IUser = {
      ...user,
      _id: user._id.toString(),
      defaultParams: updatedStats,
    };

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

function calculateUpdatedStats(
  stats: IUser["defaultParams"],
  selectedPlace: string
) {
  const energyPointsCost = getEnergyPointsCost(selectedPlace);
  const successProbability = getSuccessProbability(
    selectedPlace,
    stats.respect
  ); // Calculate the success probability based on the selected place and user's respect points

  const updatedStats = {
    ...stats,
    energy: stats.energy - energyPointsCost,
    respect: stats.respect + (successProbability > 0 ? 1 : 0),
  };

  return updatedStats;
}

function getEnergyPointsCost(selectedPlace: string) {
  // Define the energy points cost for each place
  const placeEnergyCosts: { [key: string]: number } = {
    Warehouse: 5,
    "Antique Store": 8,
  };

  return placeEnergyCosts[selectedPlace];
}

function getSuccessProbability(selectedPlace: string, respectPoints: number) {
  // Define the success probability for each place based on user's respect points
  const placeSuccessProbabilities: { [key: string]: number } = {
    Warehouse: 100 - respectPoints,
    "Antique Store": 50 - respectPoints / 2,
    Hotel: 30 - respectPoints / 3,
    // Add more place-success probability mappings here
  };

  return placeSuccessProbabilities[selectedPlace];
}
