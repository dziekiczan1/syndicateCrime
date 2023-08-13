import BuildingsContent from "@/components/content/buildings/BuildingsContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function BuildingsScreen() {
  return (
    <GameLayout>
      <BuildingsContent />
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
