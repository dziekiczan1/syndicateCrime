import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";

import UserInterface from "@/components/user/interface/UserInterface";
import { connectToDatabase } from "@/lib/db";

interface Props {
  session: Session;
  user: {
    [key: string]: any;
  };
}

export default function GameMainScreen(props: Props) {
  const user = props.user;
  return (
    <>
      <Head>
        <title>Syndicate Crime</title>
      </Head>
      <UserInterface user={user} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
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
  })) as Props["user"];

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
