import HospitalContent from "@/components/content/hospital/HospitalContent";
import GameLayout from "@/components/layout/game/GameLayout";
import UserContext from "@/store/user-context";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function HospitalScreen() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const isUserPrisoner = user?.prison?.isPrisoner;
  const isUserMission = user && user.district?.missionsStatus === "inprogress";
  const isUserHospitalized = user && user.defaultParams.life <= 0;

  if (isUserPrisoner && !isUserHospitalized) {
    router.push("/actions/prison");
  } else if (isUserMission && !isUserHospitalized) {
    router.push("/actions/districts");
  } else {
    return (
      <GameLayout>
        <HospitalContent />
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
