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

    if (userCompositeScore > sabotagedPlayerCompositeScore) {
      const sabotagedPlayerWhores = sabotagedPlayer.whores || [];
      const sabotagedPlayerWeapons = sabotagedPlayer.weapons || [];
      const sabotagedPlayerBuildings = sabotagedPlayer.buildings || [];

      const hasWhores = sabotagedPlayerWhores.length > 0;
      const hasWeapons = sabotagedPlayerWeapons.length > 0;
      const hasBuildings = sabotagedPlayerBuildings.length > 0;

      if (hasWhores || hasWeapons || hasBuildings) {
        let validResourceTypes = [];

        if (hasWhores) {
          validResourceTypes.push("whore");
        }
        if (hasWeapons) {
          validResourceTypes.push("weapon");
        }
        if (hasBuildings) {
          validResourceTypes.push("building");
        }

        const randomResourceType =
          validResourceTypes[
            Math.floor(Math.random() * validResourceTypes.length)
          ];

        let lostResourceType = "";
        let lostResource = null;

        if (randomResourceType === "whore") {
          const randomIndex = Math.floor(
            Math.random() * sabotagedPlayerWhores.length
          );
          const selectedResource = sabotagedPlayerWhores[randomIndex];

          if (
            selectedResource &&
            selectedResource.count &&
            selectedResource.count > 1
          ) {
            selectedResource.count -= 1;
            lostResource = { ...selectedResource };
          } else if (selectedResource) {
            lostResource = sabotagedPlayerWhores.splice(randomIndex, 1)[0];
          }

          lostResourceType = "whore";
        } else if (randomResourceType === "weapon") {
          const randomIndex = Math.floor(
            Math.random() * sabotagedPlayerWeapons.length
          );
          const selectedResource = sabotagedPlayerWeapons[randomIndex];

          if (
            selectedResource &&
            selectedResource.count &&
            selectedResource.count > 1
          ) {
            selectedResource.count -= 1;
            lostResource = { ...selectedResource };
          } else if (selectedResource) {
            lostResource = sabotagedPlayerWeapons.splice(randomIndex, 1)[0];
          }
          lostResourceType = "weapon";
        } else if (randomResourceType === "building") {
          const randomIndex = Math.floor(
            Math.random() * sabotagedPlayerBuildings.length
          );
          const selectedResource = sabotagedPlayerBuildings[randomIndex];

          if (
            selectedResource &&
            selectedResource.count &&
            selectedResource.count > 1
          ) {
            selectedResource.count -= 1;
            lostResource = { ...selectedResource };
          } else if (selectedResource) {
            lostResource = sabotagedPlayerBuildings.splice(randomIndex, 1)[0];
          }

          lostResourceType = "building";
        }

        if (lostResource) {
          successMessage = `You have successfully sabotaged ${sabotagedPlayer.username}! He lost 1 ${lostResourceType}.`;
        }
      } else {
        if (sabotagedPlayer.defaultParams.money > 0) {
          const lostMoney = Math.floor(
            sabotagedPlayer.defaultParams.money * 0.1
          );
          sabotagedPlayer.defaultParams.money -= lostMoney;
          user.defaultParams.money += lostMoney;
          successMessage = `You have successfully sabotaged ${
            sabotagedPlayer.username
          }! You won $${lostMoney.toLocaleString()}.`;
        } else {
          successMessage = `You have successfully sabotaged ${sabotagedPlayer.username}! Unfortunately he had no money.`;
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
    } else {
      return res.status(400).json({
        error: `You were not able to sabotage ${sabotagedPlayer.username}`,
      });
    }

    user.sabotage.sabotageHistory.push({
      playerId,
      date: new Date().toISOString().split("T")[0],
    });

    if (!successMessage) {
      successMessage = `You have successfully sabotaged ${sabotagedPlayer.username}!`;
    }

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
