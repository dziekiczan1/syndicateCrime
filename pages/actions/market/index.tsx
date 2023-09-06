import MarketContent from "@/components/content/market/MarketContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function MarketScreen() {
  return (
    <GameLayout>
      <MarketContent />
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
