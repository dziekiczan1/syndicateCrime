import GameContent from "@/components/content/game/GameContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function GameMainScreen() {
  return (
    <GameLayout>
      <GameContent />
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
