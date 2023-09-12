import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithWeapons extends IUser {
  weapons?: Weapon[];
}

export interface Weapon {
  name: string;
  cost: number;
  respect: number;
  count?: number;
}

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
    const usersCollection = client.db().collection<IUserWithWeapons>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { weapon } = req.body;
    const { action } = req.body;

    const updatedUser: IUserWithWeapons = { ...user };

    if (action === "buy") {
      const existingWeapon = updatedUser.weapons?.find(
        (w) => w.name === weapon.name
      );

      if (existingWeapon) {
        existingWeapon.count = (existingWeapon.count || 0) + 1;
        successMessage = `You have successfully bought ${weapon.name}!`;
      } else {
        if (!updatedUser.weapons) {
          updatedUser.weapons = [];
        }
        updatedUser.weapons.push({ ...weapon, count: 1 });
        successMessage = `You have successfully bought ${weapon.name}!`;
      }

      const weaponMaxLimit = user.university?.blackmarket ? 10 : 5;

      const totalWeaponsCount = updatedUser.weapons?.reduce(
        (total, w) => total + (w.count || 0),
        0
      );
      if (totalWeaponsCount && totalWeaponsCount > weaponMaxLimit) {
        return res
          .status(400)
          .json({ error: "Maximum number of weapons reached" });
      }

      if (updatedUser.defaultParams.money < weapon.cost) {
        return res
          .status(400)
          .json({ error: "Insufficient funds to buy the weapon" });
      }

      updatedUser.defaultParams.money -= weapon.cost;
      updatedUser.defaultParams.respect += weapon.respect;
    } else if (action === "discard") {
      const existingWeapons = updatedUser.weapons?.find(
        (w) => w.name === weapon.name
      );

      if (!existingWeapons) {
        return res.status(400).json({ error: "Weapon not found" });
      }

      existingWeapons.count = (existingWeapons.count || 0) - 1;
      if (existingWeapons.count <= 0) {
        updatedUser.weapons = updatedUser.weapons?.filter(
          (w) => w.name !== weapon.name
        );
      }

      updatedUser.defaultParams.respect = Math.max(
        updatedUser.defaultParams.respect - weapon.respect,
        0
      );
      successMessage = `You have successfully sold ${weapon.name}!`;
    }

    await usersCollection.updateOne(
      { email: email as string },
      { $set: updatedUser }
    );

    const { password, ...userWithoutPassword } = updatedUser;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      message: successMessage,
    } as IUser;

    client.close();

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error processing black market action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
