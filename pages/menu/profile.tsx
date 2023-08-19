import GameLayout from "@/components/layout/game/GameLayout";
import ProfileContent from "@/components/menu/profile/ProfileContent";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Profile() {
  return (
    <GameLayout>
      <ProfileContent />
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
