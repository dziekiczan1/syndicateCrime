import WhoresContent from "@/components/content/whores/WhoresContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function WhoresScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <WhoresContent />
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
