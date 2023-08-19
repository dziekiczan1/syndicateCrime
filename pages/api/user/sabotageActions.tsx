import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithSabotage extends IUser {
  sabotage: Sabotage;
}

export interface Sabotage {
  sabotageHistory: SabotageEntry[];
}

export interface SabotageEntry {
  playerId: string;
  date: string;
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
    const usersCollection = client.db().collection<IUserWithSabotage>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { playerId } = req.body;

    if (!user.sabotage) {
      user.sabotage = {
        sabotageHistory: [],
      };
    }

    if (!user.sabotage.sabotageHistory) {
      user.sabotage.sabotageHistory = [];
    }

    if (user.sabotage.sabotageHistory) {
      const today = new Date().toISOString().split("T")[0];
      const sabotagesToday = user.sabotage.sabotageHistory.filter(
        (entry: SabotageEntry) => entry.date === today
      );

      if (sabotagesToday.length >= 5) {
        return res
          .status(400)
          .json({ error: "You have reached the daily sabotage limit" });
      }
    } else {
      user.sabotage.sabotageHistory = [];
    }

    const sabotagedPlayerId = playerId;
    let sabotagedPlayerObjectId = new ObjectId(sabotagedPlayerId);

    const sabotagedPlayer = await usersCollection.findOne({
      _id: sabotagedPlayerObjectId,
    });

    if (!sabotagedPlayer) {
      return res.status(404).json({ error: "Sabotaged player not found" });
    }

    sabotagedPlayer.defaultParams.life -= 20;

    await usersCollection.updateOne(
      { _id: sabotagedPlayerObjectId },
      { $set: sabotagedPlayer }
    );

    user.sabotage.sabotageHistory.push({
      playerId,
      date: new Date().toISOString().split("T")[0],
    });

    const updatedUser: IUserWithSabotage = { ...user };

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
    console.error("Error processing sabotage action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
