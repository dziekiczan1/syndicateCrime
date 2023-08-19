import GameLayout from "@/components/layout/game/GameLayout";
import StatisticsContent from "@/components/menu/statistics/StatisticsContent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Statistics() {
  return (
    <GameLayout>
      <StatisticsContent />
    </GameLayout>
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
