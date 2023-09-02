import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithMarket extends IUser {
  market?: MarketCompany[];
}

export interface MarketCompany {
  name: string;
  averageCost: number;
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
    const usersCollection = client.db().collection<IUserWithMarket>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { company, action, newCurrentCost } = req.body;

    const updatedUser: IUserWithMarket = { ...user };
    const fixedCurrentCost = parseFloat(company.currentCost.toFixed(2));

    if (action === "buy") {
      const existingCompany = updatedUser.market?.find(
        (c) => c.name === company.name
      );
      if (existingCompany) {
        existingCompany.count = (existingCompany.count || 0) + 1;
        existingCompany.averageCost =
          ((existingCompany.averageCost || 0) + fixedCurrentCost) /
          existingCompany.count;
        successMessage = `You have successfully bought the shares of ${company.name}!`;
      } else {
        if (!updatedUser.market) {
          updatedUser.market = [];
        }
        company.averageCost = fixedCurrentCost;
        updatedUser.market.push({ ...company, count: 1 });
        successMessage = `You have successfully bought the shares of ${company.name}!`;
      }

      const sharesMaxLimit = user.university?.market ? 10 : 5;
      const totalSharesCount = updatedUser.market?.reduce(
        (total, c) => total + (c.count || 0),
        0
      );
      if (totalSharesCount && totalSharesCount > sharesMaxLimit) {
        return res
          .status(400)
          .json({ error: "Maximum number of shares reached" });
      }

      if (updatedUser.defaultParams.money < fixedCurrentCost) {
        return res
          .status(400)
          .json({ error: "Insufficient funds to buy the shares" });
      }

      updatedUser.defaultParams.money -= fixedCurrentCost;
    } else if (action === "sell") {
      const existingCompany = updatedUser.market?.find(
        (c) => c.name === company.name
      );

      if (!existingCompany) {
        return res.status(400).json({ error: "Shares not found" });
      }

      existingCompany.count = (existingCompany.count || 0) - 1;
      if (existingCompany.count <= 0) {
        updatedUser.market = updatedUser.market?.filter(
          (c) => c.name !== company.name
        );
      }

      const roundedCostSell = parseFloat(newCurrentCost.toFixed(2));
      updatedUser.defaultParams.money += roundedCostSell;
      successMessage = `You have successfully sold shares of ${company.name}!`;
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
    console.error("Error processing market action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
