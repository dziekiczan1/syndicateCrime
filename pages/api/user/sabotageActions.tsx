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

    const requiredEnergyPoints = 20;

    if (user.defaultParams.energy < requiredEnergyPoints) {
      return res.status(404).json({ error: "You don't have enough energy." });
    }

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

      const historyToKeep = sabotagesToday.slice(-5);

      if (sabotagesToday.length >= 5) {
        return res
          .status(400)
          .json({ error: "You have reached the daily sabotage limit" });
      }

      const hasSabotagedPlayerToday = sabotagesToday.some(
        (entry: SabotageEntry) => entry.playerId === playerId
      );

      if (hasSabotagedPlayerToday) {
        return res
          .status(400)
          .json({ error: "You have already sabotaged this player today" });
      }

      user.sabotage.sabotageHistory = historyToKeep;
    }

    const sabotagedPlayerId = playerId;
    let sabotagedPlayerObjectId = new ObjectId(sabotagedPlayerId);

    const sabotagedPlayer = await usersCollection.findOne({
      _id: sabotagedPlayerObjectId,
    });

    if (!sabotagedPlayer) {
      return res.status(404).json({ error: "Sabotaged player not found" });
    }

    const userCompositeScore =
      user.defaultParams.respect +
      user.defaultParams.strength +
      user.defaultParams.endurance;

    const sabotagedPlayerCompositeScore =
      sabotagedPlayer.defaultParams.respect +
      sabotagedPlayer.defaultParams.strength +
      sabotagedPlayer.defaultParams.endurance;

    if (userCompositeScore <= sabotagedPlayerCompositeScore) {
      return res.status(400).json({
        error: `You were not able to sabotage ${sabotagedPlayer.username}`,
      });
    }

    const resourceTypes = ["whore", "weapon", "building"];

    const validResourceTypes = resourceTypes.filter((resourceType) => {
      const resourceArray = (sabotagedPlayer as any)[`${resourceType}s`] || [];
      return resourceArray.length > 0;
    });

    if (validResourceTypes.length === 0) {
      let lostMoney = 0;
      if (sabotagedPlayer.defaultParams.money > 0) {
        lostMoney = Math.floor(sabotagedPlayer.defaultParams.money * 0.1);
        sabotagedPlayer.defaultParams.money -= lostMoney;
        user.defaultParams.money += lostMoney;
      }

      successMessage = lostMoney
        ? `You have successfully sabotaged ${
            sabotagedPlayer.username
          }! You won $${lostMoney.toLocaleString()}.`
        : `You have successfully sabotaged ${sabotagedPlayer.username}! Unfortunately, he had no money.`;
    } else {
      const randomResourceType =
        validResourceTypes[
          Math.floor(Math.random() * validResourceTypes.length)
        ];

      const resourceArray = (sabotagedPlayer as any)[`${randomResourceType}s`];
      const randomIndex = Math.floor(Math.random() * resourceArray.length);
      const selectedResource = resourceArray[randomIndex];

      let lostResourceType = randomResourceType;
      let lostResource = null;

      if (selectedResource) {
        if (selectedResource.count && selectedResource.count > 1) {
          selectedResource.count -= 1;
          lostResource = { ...selectedResource };
        } else {
          lostResource = resourceArray.splice(randomIndex, 1)[0];
        }
      }

      let lostMoney = 0;
      if (sabotagedPlayer.defaultParams.money > 0) {
        lostMoney = Math.floor(sabotagedPlayer.defaultParams.money * 0.1);
        sabotagedPlayer.defaultParams.money -= lostMoney;
        user.defaultParams.money += lostMoney;
      }

      if (lostResource) {
        successMessage = `You have successfully sabotaged ${sabotagedPlayer.username}! He lost 1 ${lostResourceType}.`;
        if (lostMoney > 0) {
          successMessage += ` You won $${lostMoney.toLocaleString()}.`;
        } else {
          successMessage += ` Unfortunately, he had no money.`;
        }
      } else {
        successMessage = `You have successfully sabotaged ${sabotagedPlayer.username}! Unfortunately, he had no ${lostResourceType}s.`;
        if (lostMoney > 0) {
          successMessage += ` You won $${lostMoney.toLocaleString()}.`;
        }
      }
    }

    user.defaultParams.energy -= requiredEnergyPoints;

    sabotagedPlayer.defaultParams.life = Math.max(
      sabotagedPlayer.defaultParams.life - 20,
      0
    );

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
      message: successMessage,
    } as IUser;

    client.close();

    return res.status(200).json(serializedUser);
  } catch (error) {
    console.error("Error processing sabotage action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
