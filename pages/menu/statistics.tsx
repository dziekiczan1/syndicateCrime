import GameLayout from "@/components/layout/game/GameLayout";
import Statistics from "@/components/menu/statistics/Statistics";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function GameMainScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <Statistics />
      </GameLayout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
