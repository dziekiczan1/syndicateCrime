import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();

        return {
          email: user.email,
          id: user._id,
          username: user.username,
        } as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
