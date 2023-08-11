import UniversityContent from "@/components/content/university/UniversityContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function UniversityScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <UniversityContent />
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
