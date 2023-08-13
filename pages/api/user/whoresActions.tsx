import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithWhores extends IUser {
  whores?: Whore[];
}

export interface Whore {
  name: string;
  cost: number;
  earnings: number;
  count?: number;
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
    const usersCollection = client.db().collection<IUserWithWhores>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { whore } = req.body;
    const { action } = req.body;

    const updatedUser: IUserWithWhores = { ...user };

    if (action === "buy") {
      const existingWhore = updatedUser.whores?.find(
        (w) => w.name === whore.name
      );
      if (existingWhore) {
        existingWhore.count = (existingWhore.count || 0) + 1;
        successMessage = `You have successfully bought the whore named ${whore.name}!`;
      } else {
        if (!updatedUser.whores) {
          updatedUser.whores = [];
        }
        updatedUser.whores.push({ ...whore, count: 1 });
        successMessage = `You have successfully bought the whore named ${whore.name}!`;
      }

      const totalWhoreCount = updatedUser.whores?.reduce(
        (total, w) => total + (w.count || 0),
        0
      );
      if (totalWhoreCount && totalWhoreCount > 5) {
        return res
          .status(400)
          .json({ error: "Maximum number of whores reached" });
      }

      if (updatedUser.defaultParams.money < whore.cost) {
        return res
          .status(400)
          .json({ error: "Insufficient funds to buy the whore" });
      }

      updatedUser.defaultParams.money -= whore.cost;
    } else if (action === "fire") {
      const existingWhore = updatedUser.whores?.find(
        (w) => w.name === whore.name
      );

      if (!existingWhore) {
        return res.status(400).json({ error: "Whore not found" });
      }

      existingWhore.count = (existingWhore.count || 0) - 1;
      if (existingWhore.count <= 0) {
        updatedUser.whores = updatedUser.whores?.filter(
          (w) => w.name !== whore.name
        );
      }
      successMessage = "You have successfully sold the whore!";
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
    console.error("Error processing bank action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
