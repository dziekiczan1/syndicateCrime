import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithBuildings extends IUser {
  buildings?: Buildings[];
}

export interface Buildings {
  name: string;
  cost: number;
  bonus: number;
  count?: number;
}

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
    const usersCollection = client.db().collection<IUserWithBuildings>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { building } = req.body;
    const { action } = req.body;

    const updatedUser: IUserWithBuildings = { ...user };

    if (action === "buy") {
      const existingBuilding = updatedUser.buildings?.find(
        (b) => b.name === building.name
      );
      if (existingBuilding) {
        existingBuilding.count = (existingBuilding.count || 0) + 1;
      } else {
        if (!updatedUser.buildings) {
          updatedUser.buildings = [];
        }
        updatedUser.buildings.push({ ...building, count: 1 });
      }

      const totalBuildingsCount = updatedUser.buildings?.reduce(
        (total, b) => total + (b.count || 0),
        0
      );
      if (totalBuildingsCount && totalBuildingsCount > 5) {
        return res
          .status(400)
          .json({ error: "Maximum number of whores reached" });
      }

      if (updatedUser.defaultParams.money < building.cost) {
        return res
          .status(400)
          .json({ error: "Insufficient funds to buy the building" });
      }

      updatedUser.defaultParams.money -= building.cost;
    } else if (action === "sell") {
      const existingBuilding = updatedUser.buildings?.find(
        (b) => b.name === building.name
      );

      if (!existingBuilding) {
        return res.status(400).json({ error: "Building not found" });
      }

      existingBuilding.count = (existingBuilding.count || 0) - 1;
      if (existingBuilding.count <= 0) {
        updatedUser.buildings = updatedUser.buildings?.filter(
          (b) => b.name !== building.name
        );
      }
      updatedUser.defaultParams.money += building.cost * 0.5;
    }

    await usersCollection.updateOne(
      { email: email as string },
      { $set: updatedUser }
    );

    const { password, ...userWithoutPassword } = updatedUser;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
    } as IUser;

    client.close();

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error processing building action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
