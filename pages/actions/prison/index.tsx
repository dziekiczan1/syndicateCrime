import PrisonContent from "@/components/content/prison/PrisonContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function PrisonScreen() {
  return (
    <GameLayout>
      <PrisonContent />
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
