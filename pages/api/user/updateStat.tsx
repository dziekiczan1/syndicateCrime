import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";
import { authOptions } from "../auth/[...nextauth]";

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
    const usersCollection = client.db().collection<IUser>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { statToUpdate, valueToUpdate } = req.body;

    if (!valueToUpdate) {
      return res.status(404).json({ error: `Choose your ${statToUpdate}!` });
    }

    switch (statToUpdate) {
      case "avatar":
        user.avatar = valueToUpdate;
        successMessage = "Your avatar has been changed.";
        break;
      case "respect":
        user.defaultParams.respect = valueToUpdate;
        successMessage = "Your respect stats has been updated.";
        break;
      case "money":
        user.defaultParams.money = valueToUpdate;
        successMessage = "Your money stats has been updated.";
        break;
      case "strength":
        user.defaultParams.strength = valueToUpdate;
        successMessage = "Your strength stats has been updated.";
        break;
      case "intelligence":
        user.defaultParams.intelligence = valueToUpdate;
        successMessage = "Your intelligence stats has been updated.";
        break;
      case "endurance":
        user.defaultParams.endurance = valueToUpdate;
        successMessage = "Your endurance stats has been updated.";
        break;
      case "charisma":
        user.defaultParams.charisma = valueToUpdate;
        successMessage = "Your charisma stats has been updated.";
        break;
      default:
        return res
          .status(400)
          .json({ error: "There was problem with updating your stats." });
    }

    await usersCollection.updateOne({ email: email as string }, { $set: user });

    const { password, ...userWithoutPassword } = user;

    const serializedUser = {
      ...userWithoutPassword,
      _id: user._id.toString(),
      message: successMessage,
    } as IUser;

    client.close();
    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
