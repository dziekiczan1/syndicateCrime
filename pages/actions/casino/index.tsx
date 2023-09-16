import CasinoContent from "@/components/content/casino/CasinoContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withLifeCheck } from "@/lib/withLifeCheck";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function CasinoScreen() {
  return (
    <GameLayout>
      <CasinoContent />
    </GameLayout>
  );
}

export const getServerSideProps = withLifeCheck(
  withPrisonCheck(
    withSessionCheck(async () => {
      return {
        props: {},
      };
    })
  )
);
