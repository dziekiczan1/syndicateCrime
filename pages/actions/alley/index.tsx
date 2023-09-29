import AlleyContent from "@/components/content/alley/AlleyContent";
import GameLayout from "@/components/layout/game/GameLayout";
import Loading from "@/components/ui/loading/Loading";
import useUserStatus from "@/lib/useUserStatus";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function AlleyScreen() {
  const isUserAuthorized = useUserStatus();

  if (isUserAuthorized) {
    return (
      <GameLayout>
        <AlleyContent />
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="flex items-center justify-center">
        <Loading />
      </div>
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
