import GameLayout from "@/components/layout/game/GameLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function GameMainScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>asd</GameLayout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
