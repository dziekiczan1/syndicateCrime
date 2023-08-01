import BlackmarketContent from "@/components/content/blackmarket/BlackmarketContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function BlackmarketScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <BlackmarketContent />
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
