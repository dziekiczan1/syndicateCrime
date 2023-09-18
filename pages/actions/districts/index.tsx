import DistrictContent from "@/components/content/district/DistrictContent";
import GameLayout from "@/components/layout/game/GameLayout";
import Loading from "@/components/ui/loading/Loading";
import useUserStatus from "@/lib/useUserStatus";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function DistrictScreen() {
  const isUserAuthorized = useUserStatus();

  if (isUserAuthorized === true) {
    return (
      <GameLayout>
        <DistrictContent />
      </GameLayout>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loading />
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
