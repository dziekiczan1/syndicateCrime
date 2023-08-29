import NightclubContent from "@/components/content/nightclub/NightclubContent";
import ErrorBoundary from "@/components/layout/errorboundary/ErrorBoundary";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function NightclubScreen() {
  return (
    <GameLayout>
      <ErrorBoundary>
        <NightclubContent />
      </ErrorBoundary>
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
