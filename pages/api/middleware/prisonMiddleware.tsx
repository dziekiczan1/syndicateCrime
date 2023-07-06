import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";

export interface MiddlewareResponse {
  isPrisoner: boolean;
  error?: string;
}

export async function prisonMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<MiddlewareResponse> {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return { isPrisoner: false, error: "Unauthorized" };
    }
    if (session) {
      const { email } = session.user!;
      const client = await connectToDatabase();
      const usersCollection = client.db().collection<IUser>("users");
      const user = await usersCollection.findOne({ email: email as string });

      if (!user) {
        return { isPrisoner: false, error: "User not found" };
      }

      if (user && user.prison?.isPrisoner) {
        return { isPrisoner: true };
      }
    }

    return { isPrisoner: false };
  } catch (error) {
    console.error("Error in prisonMiddleware:", error);
    return { isPrisoner: false, error: "Server error" };
  }
}
