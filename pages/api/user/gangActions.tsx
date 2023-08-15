import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
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

    const { gang } = req.body;

    const updatedUser: IUser = { ...user };

    if (gang) {
      if (updatedUser.defaultParams.respect < gang.minRespect) {
        return res
          .status(400)
          .json({ error: "Not enough respect to join a gang" });
      }

      switch (gang.title) {
        case "nightshade":
          updatedUser.defaultParams.gang = gang.name;
          successMessage = `You declared your loyalty to ${gang.name}`;
          break;

        case "crimson":
          updatedUser.defaultParams.gang = gang.name;
          successMessage = `You declared your loyalty to ${gang.name}`;
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
    console.error("Error processing building action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
