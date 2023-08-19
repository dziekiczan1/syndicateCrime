import BuildingsContent from "@/components/content/buildings/BuildingsContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function BuildingsScreen() {
  return (
    <GameLayout>
      <BuildingsContent />
    </GameLayout>
  );
}

export const getServerSideProps = withPrisonCheck(
  withSessionCheck(async () => {
    return {
      props: {},
    };
  })
);
