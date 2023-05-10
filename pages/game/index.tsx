import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import Logo from "@/components/layout/logo/Logo";
import UserInterface from "@/components/user/interface/UserInterface";
import { connectToDatabase } from "@/lib/db";
import UserContext, { IUser } from "@/store/user-context";

export interface IGameMainScreenProps {
  session: Session;
  user: IUser | null;
}

export default function GameMainScreen(props: IGameMainScreenProps) {
  const [user, setUser] = useState<IUser | null>(props.user);
  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>
      <Head>
        <title>Syndicate Crime</title>
      </Head>
      <div className="flex gap-8 p-4">
        <Logo width={400} height={180} />
        <UserInterface />
      </div>
    </UserContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps<
  IGameMainScreenProps
> = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { email } = session.user!;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = (await usersCollection.findOne({
    email: email,
  })) as IGameMainScreenProps["user"];

  if (!user) {
    return {
      notFound: true,
    };
  }

  const serializedUser = {
    ...user,
    _id: user._id.toString(),
  };

  return {
    props: { session, user: serializedUser },
  };
};
