import RobberyContent from "@/components/content/robbery/RobberyContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function GameMainScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <RobberyContent />
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
