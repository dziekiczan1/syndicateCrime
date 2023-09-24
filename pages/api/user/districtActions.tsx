import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { IUser } from "@/store/user-context";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export interface IUserWithDistrict extends IUser {
  district?: Mission;
}

export interface Mission {
  grandmother: MissionStatus;
  undercover: MissionStatus;
  treasure: MissionStatus;
  racing: MissionStatus;
  enigma: MissionStatus;
  heist: MissionStatus;
  [key: string]: any;
  missionsStatus: string;
}

export interface MissionStatus {
  status: string;
  timeRemaining: number;
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
    const usersCollection = client.db().collection<IUserWithDistrict>("users");
    const user = await usersCollection.findOne({ email: email as string });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { mission } = req.body;

    const updatedUser: IUserWithDistrict = { ...user };

    updateUserDistrict(updatedUser, mission);

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
    console.error("Error processing university action:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function updateUserDistrict(user: IUserWithDistrict, mission: any) {
  if (!user.district) {
    user.district = {
      missionsStatus: "unfinished",
      grandmother: { status: "unfinished", timeRemaining: 0 },
      undercover: { status: "unfinished", timeRemaining: 0 },
      treasure: { status: "unfinished", timeRemaining: 0 },
      racing: { status: "unfinished", timeRemaining: 0 },
      enigma: { status: "unfinished", timeRemaining: 0 },
      heist: { status: "unfinished", timeRemaining: 0 },
    };
  }

  if (mission) {
    user.district.missionsStatus = "inprogress";

    switch (mission.short) {
      case "grandmother":
      case "undercover":
      case "treasure":
      case "racing":
      case "enigma":
      case "heist": {
        user.district[mission.short] = {
          status: "inprogress",
          timeRemaining: mission.time,
        };
        break;
      }

      default:
        break;
    }
  }
}
