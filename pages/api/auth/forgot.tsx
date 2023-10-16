import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/lib/db";
import { mailOptions, transporter } from "@/lib/nodemailer";
import { IUser } from "@/store/user-context";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db
    .collection<IUser>("users")
    .findOne({ email: email });

  if (!existingUser) {
    return res.status(400).json({ message: "Email does not exist." });
  }

  const user_token = jwt.sign(
    { userId: existingUser._id.toString() },
    process.env.NEXTAUTH_SECRET,
    {
      expiresIn: "1h",
    }
  );

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Reset Password",
      text: `Reset Password Link: http://localhost:3000/forgot/${user_token}`,
      html: `<p>Reset Password Link: <a href="http://localhost:3000/forgot/${user_token}">Reset Password</a></p>`,
    });

    await db.collection<IUser>("users").updateOne(
      { _id: existingUser._id },
      {
        $set: { resetPasswordToken: user_token },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Email not sent!" });
  }

  client.close();

  res.status(201).json({ message: "Email sent!" });
}

export default handler;
