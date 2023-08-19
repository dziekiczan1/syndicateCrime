import GameLayout from "@/components/layout/game/GameLayout";
import HelpContent from "@/components/menu/help/HelpContent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Help() {
  return (
    <GameLayout>
      <HelpContent />
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
