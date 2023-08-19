import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface GangDetailsResponse {
  members: IUser[];
  totalMembers?: number;
}

import { shuffleArray } from "@/lib/shuffleArray";
import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GangDetailsResponse | { error: string }>
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUser>("users");

    const { gangName, sabotage, respect } = req.body;

    if (gangName && !sabotage) {
      const users = await usersCollection
        .find({ "defaultParams.gang": gangName })
        .toArray();

      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      const serializedUsers = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          _id: user._id.toString(),
        };
      });

      const totalMembers = serializedUsers.length;

      client.close();
      return res.status(200).json({ members: serializedUsers, totalMembers });
    } else if (gangName && sabotage && respect) {
      let query: any = { "defaultParams.gang": gangName };
      const minRespect = respect - 200;
      const maxRespect = respect + 200;

      query = {
        $or: [
          {
            "defaultParams.gang": { $ne: gangName },
            "defaultParams.respect": { $gte: minRespect, $lte: maxRespect },
          },
          {
            "defaultParams.gang": { $exists: false },
            "defaultParams.respect": { $gte: minRespect, $lte: maxRespect },
          },
        ],
      };

      const users = await usersCollection.find(query).toArray();

      console.log(users);

      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      const shuffledUsers = shuffleArray(users);
      const selectedUsers = shuffledUsers.slice(0, 5);

      const serializedUsers = selectedUsers.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          _id: user._id.toString(),
        };
      });

      client.close();
      return res.status(200).json({ members: serializedUsers });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
