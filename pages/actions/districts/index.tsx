import DistrictContent from "@/components/content/district/DistrictContent";
import GameLayout from "@/components/layout/game/GameLayout";
import UserContext from "@/store/user-context";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function DistrictScreen() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const isUserPrisoner = user?.prison?.isPrisoner;
  const isUserHospitalized = user && user.defaultParams.life <= 0;

  if (isUserPrisoner) {
    router.push("/actions/prison");
  } else if (isUserHospitalized) {
    router.push("/actions/hospital");
  } else {
    return (
      <GameLayout>
        <DistrictContent />
      </GameLayout>
    );
  }
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
