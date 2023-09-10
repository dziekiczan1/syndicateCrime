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

      switch (mission.short) {
        case "sabotage":
          if (updatedUser.alley.sabotage) {
            return res
              .status(400)
              .json({ error: "You already completed this mission." });
          }
          updatedUser.alley.sabotage = true;
          updatedUser.defaultParams.money += mission.bonus.money;
          updatedUser.defaultParams.respect += mission.bonus.statValue;

          updatedUser.whores?.push({
            name: "Lollipop",
            cost: 1000,
            earnings: 60000,
            count: 1,
          });

          successMessage = "Successfully completed sabotage mission";
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
