import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { getDefaultUniversity } from "@/lib/university";
import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithCourses extends IUser {
  university?: University;
}

export interface University {
  architecture: boolean;
  pimp: boolean;
  blackmarket: boolean;
  bank: boolean;
  [key: string]: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: string }>
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = session.user!;
    const client = await connectToDatabase();
    const usersCollection = client.db().collection<IUserWithCourses>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { course } = req.body;

    const updatedUser: IUserWithCourses = { ...user };

    if (course) {
      if (updatedUser.defaultParams.money < course.cost) {
        return res
          .status(400)
          .json({ error: "Insufficient funds to take the course" });
      }

      if (updatedUser.defaultParams.respect < course.reqRespect) {
        return res
          .status(400)
          .json({ error: "Not enough respect to take the course" });
      }

      if (!updatedUser.university) {
        updatedUser.university = getDefaultUniversity();
      }

      switch (course.name) {
        case "architecture":
          if (updatedUser.defaultParams.intelligence < course.reqValue) {
            return res
              .status(400)
              .json({ error: "Not enough intelligence to take the course" });
          }
          updatedUser.university.architecture = true;
          break;

        case "pimp":
          if (updatedUser.defaultParams.charisma < course.reqValue) {
            return res
              .status(400)
              .json({ error: "Not enough charisma to take the course" });
          }
          updatedUser.university.pimp = true;
          break;

        case "blackmarket":
          if (updatedUser.defaultParams.strength < course.reqValue) {
            return res
              .status(400)
              .json({ error: "Not enough strength to take the course" });
          }
          updatedUser.university.blackmarket = true;
          break;

        case "bank":
          if (updatedUser.defaultParams.endurance < course.reqValue) {
            return res
              .status(400)
              .json({ error: "Not enough endurance to take the course" });
          }
          updatedUser.university.bank = true;
          break;

        default:
          break;
      }

      updatedUser.defaultParams.money -= course.cost;
    }

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
    console.error("Error processing building action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
