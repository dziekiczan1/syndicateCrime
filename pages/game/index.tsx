import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

import GameLayout from "@/components/layout/game/GameLayout";
import { connectToDatabase } from "@/lib/db";
import UserContext, { IUser } from "@/store/user-context";

export interface IGameMainScreenProps {
  session: Session;
  user: IUser | null;
}

export default function GameMainScreen(props: IGameMainScreenProps) {
  const [user, setUser] = useState<IUser | null>(props.user);
  const contextValue = { user, setUser };

  useEffect(() => {
    const socket = new w3cwebsocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    socket.onmessage = (event) => {
      const userData = JSON.parse(event.data.toString());
      setUser(userData.payload);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <UserContext.Provider value={contextValue}>
      <Head>
        <title>Syndicate Crime</title>
      </Head>
      <div className="h-screen no-scrollbar overflow-y-scroll">
        <div className="absolute -z-10 h-screen w-screen">
          {/* <Image
            src={images.loginBackground}
            alt="Login Background"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-full h-full"
          /> */}
        </div>
        <GameLayout />
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
