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

    const selectedPlace = req.body.selectedPlace;
    const updatedStats = await calculateUpdatedStats(
      user.defaultParams,
      selectedPlace
    );

    // Update the user's stats in the database
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { defaultParams: updatedStats } }
    );

    const { password, ...userWithoutPassword } = user;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      defaultParams: updatedStats,
    } as IUser;

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function calculateUpdatedStats(
  stats: IUser["defaultParams"],
  selectedPlace: string
): Promise<IUser["defaultParams"]> {
  const energyPointsCost = await getEnergyPointsCost(selectedPlace);

  console.log("energyPointsCost", energyPointsCost);

  const updatedStats = {
    ...stats,
    energy: stats.energy - energyPointsCost,
  };

  return updatedStats;
}

async function getEnergyPointsCost(selectedPlace: string): Promise<number> {
  try {
    const response = await fetch("http://localhost:3000/api/user/places");

    if (response.ok) {
      const placeEnergyCosts = await response.json();

      // Find the object with the matching name
      const selectedPlaceObject = placeEnergyCosts.find(
        (place: { name: string; energyCost: number }) =>
          place.name === selectedPlace
      );

      if (selectedPlaceObject) {
        return selectedPlaceObject.energyCost;
      } else {
        console.error("Selected place not found in placeEnergyCosts");
      }
    } else {
      console.error("Error fetching place energy costs:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching place energy costs:", error);
  }

  // Return a default value or handle the error case
  return 0;
}
