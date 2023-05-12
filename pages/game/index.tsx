import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import Logo from "@/components/layout/logo/Logo";
import UserInterface from "@/components/user/interface/UserInterface";
import { images } from "@/constants";
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
      <div>
        <div className="absolute -z-10 h-screen w-screen">
          <Image
            src={images.loginBackground}
            alt="Login Background"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="no-scrollbar relative z-1 overflow-y-scroll">
          <div className="flex p-8">
            <div className="flex w-1/2">
              <UserInterface />
            </div>
            <div className="flex justify-center w-1/2">
              <Logo width={300} height={180} />
            </div>
          </div>
        </div>
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
