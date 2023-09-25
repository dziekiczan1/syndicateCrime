import GangContent from "@/components/content/gang/GangContent";
import GameLayout from "@/components/layout/game/GameLayout";
import Loading from "@/components/ui/loading/Loading";
import useUserStatus from "@/lib/useUserStatus";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function GangScreen() {
  const isUserAuthorized = useUserStatus();

  if (isUserAuthorized) {
    return (
      <GameLayout>
        <GangContent />
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
