import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { getDefaultAlley } from "@/lib/alley";
import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithalley extends IUser {
  alley?: Alley;
}

export interface Alley {
  heist: boolean;
  escape: boolean;
  sabotage: boolean;
  university: boolean;
  respect: boolean;
  intelligence: boolean;
  [key: string]: boolean;
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
    const usersCollection = client.db().collection<IUserWithalley>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { mission } = req.body;

    const updatedUser: IUserWithalley = { ...user };

    if (mission) {
      if (!updatedUser.alley) {
        updatedUser.alley = getDefaultAlley();
      }

      let existingWhore;
      let existingWeapon;
      let existingBuilding;

      const extraWhore = { name: "Lollipop", cost: 1000, earnings: 60000 };
      const extraWeapon = { name: "Venom", cost: 1000, respect: 16000 };
      const extraBuilding = { name: "Arena", cost: 1000, bonus: 175000 };

      switch (mission.short) {
        case "heist":
          if (updatedUser.alley.heist) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.heist = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.endurance += mission.bonus.statValue;

          existingBuilding = updatedUser.buildings?.find(
            (b) => b.name === extraBuilding.name
          );

          if (existingBuilding) {
            existingBuilding.count = (existingBuilding.count || 0) + 1;
          } else {
            if (!updatedUser.buildings) {
              updatedUser.buildings = [];
            }
            updatedUser.buildings.push({ ...extraBuilding, count: 1 });
          }

          successMessage = "Successfully completed heist mission";
          break;

        case "escape":
          if (updatedUser.alley.escape) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.escape = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.charisma += mission.bonus.statValue;

          existingWeapon = updatedUser.weapons?.find(
            (w) => w.name === extraWeapon.name
          );

          if (existingWeapon) {
            existingWeapon.count = (existingWeapon.count || 0) + 1;
          } else {
            if (!updatedUser.weapons) {
              updatedUser.weapons = [];
            }
            updatedUser.weapons.push({ ...extraWeapon, count: 1 });
          }

          updatedUser.defaultParams.respect += extraWeapon.respect;

          successMessage = "Successfully completed heist mission";
          break;

        case "sabotage":
          if (updatedUser.alley.sabotage) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.sabotage = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.respect += mission.bonus.statValue;

          existingWhore = updatedUser.whores?.find(
            (w) => w.name === extraWhore.name
          );

          if (existingWhore) {
            existingWhore.count = (existingWhore.count || 0) + 1;
          } else {
            if (!updatedUser.whores) {
              updatedUser.whores = [];
            }
            updatedUser.whores.push({ ...extraWhore, count: 1 });
          }

          successMessage = "Successfully completed sabotage mission";
          break;

        case "university":
          if (updatedUser.alley.university) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.university = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.intelligence += mission.bonus.statValue;

          existingBuilding = updatedUser.buildings?.find(
            (b) => b.name === extraBuilding.name
          );

          if (existingBuilding) {
            existingBuilding.count = (existingBuilding.count || 0) + 2;
          } else {
            if (!updatedUser.buildings) {
              updatedUser.buildings = [];
            }
            updatedUser.buildings.push({ ...extraBuilding, count: 2 });
          }

          successMessage = "Successfully completed heist mission";
          break;

        case "respect":
          if (updatedUser.alley.respect) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.respect = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.respect += mission.bonus.statValue * 2;

          existingWeapon = updatedUser.weapons?.find(
            (w) => w.name === extraWeapon.name
          );

          if (existingWeapon) {
            existingWeapon.count = (existingWeapon.count || 0) + 2;
          } else {
            if (!updatedUser.weapons) {
              updatedUser.weapons = [];
            }
            updatedUser.weapons.push({ ...extraWeapon, count: 2 });
          }

          updatedUser.defaultParams.respect += extraWeapon.respect;

          successMessage = "Successfully completed heist mission";
          break;

        case "intelligence":
          if (updatedUser.alley.intelligence) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.intelligence = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.intelligence += mission.bonus.statValue;

          existingWhore = updatedUser.whores?.find(
            (w) => w.name === extraWhore.name
          );

          if (existingWhore) {
            existingWhore.count = (existingWhore.count || 0) + 2;
          } else {
            if (!updatedUser.whores) {
              updatedUser.whores = [];
            }
            updatedUser.whores.push({ ...extraWhore, count: 2 });
          }

          successMessage = "Successfully completed intelligence mission";
          break;

        default:
          break;
      }
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
    console.error("Error processing university action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
