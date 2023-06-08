import GameLayout from "@/components/layout/game/GameLayout";
import HelpContent from "@/components/menu/help/HelpContent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Help() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <HelpContent />
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
