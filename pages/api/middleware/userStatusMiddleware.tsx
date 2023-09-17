import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { connectToDatabase } from "@/lib/db";
import { IUser } from "@/store/user-context";

export async function userStatusMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: any;
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return { isAuthorized: false, error: "Unauthorized" };
    }

    const { email } = session.user!;
    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUser>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return { isAuthorized: false, error: "User not found" };
    }

    if (user.defaultParams.life <= 0) {
      return { isAuthorized: false, redirect: "/actions/hospital" };
    } else {
      if (user.prison?.isPrisoner) {
        return { isAuthorized: false, redirect: "/actions/prison" };
      }
    }

    return { isAuthorized: true };
  } catch (error) {
    console.error("Error in userStatusMiddleware:", error);
    return { isAuthorized: false, error: "Server error" };
  } finally {
    if (client) {
      client.close();
    }
  }
}
