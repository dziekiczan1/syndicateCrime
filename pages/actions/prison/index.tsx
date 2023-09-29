import PrisonContent from "@/components/content/prison/PrisonContent";
import GameLayout from "@/components/layout/game/GameLayout";
import UserContext from "@/store/user-context";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function PrisonScreen() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const isUserHospitalized = user && user.defaultParams.life <= 0;
  const isUserPrisoner = user?.prison?.isPrisoner;
  const isUserMission = user && user.district?.missionsStatus === "inprogress";

  if (isUserHospitalized) {
    router.push("/actions/hospital");
  } else if (isUserMission && !isUserPrisoner) {
    router.push("/actions/districts");
  } else {
    return (
      <GameLayout>
        <PrisonContent />
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
