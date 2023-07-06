import HospitalContent from "@/components/content/hospital/HospitalContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function HospitalScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <HospitalContent />
      </GameLayout>
    </div>
  );
}

export const getServerSideProps = withPrisonCheck(
  withSessionCheck(async () => {
    return {
      props: {},
    };
  })
);
