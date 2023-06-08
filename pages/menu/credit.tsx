import GameLayout from "@/components/layout/game/GameLayout";
import CreditContent from "@/components/menu/credit/CreditContent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Credit() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <CreditContent />
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
