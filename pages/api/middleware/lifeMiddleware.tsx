import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";

export interface LifeMiddlewareResponse {
  isPlayerDead: boolean;
  error?: string;
}

export async function lifeMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<LifeMiddlewareResponse> {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return { isPlayerDead: false, error: "Unauthorized" };
    }
    if (session) {
      const { email } = session.user!;
      const client = await connectToDatabase();
      const usersCollection = client.db().collection<IUser>("users");
      const user = await usersCollection.findOne({ email: email as string });

      if (!user) {
        return { isPlayerDead: false, error: "User not found" };
      }

      if (user && user.defaultParams.life <= 0) {
        return { isPlayerDead: true };
      }

      client.close();
    }

    return { isPlayerDead: false };
  } catch (error) {
    console.error("Error in lifeMiddleware:", error);
    return { isPlayerDead: false, error: "Server error" };
  }
}
