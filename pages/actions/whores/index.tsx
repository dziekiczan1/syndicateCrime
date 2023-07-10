import WhoresContent from "@/components/content/whores/WhoresContent";
import GameLayout from "@/components/layout/game/GameLayout";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function WhoresScreen() {
  return (
    <div className="h-screen no-scrollbar overflow-y-scroll">
      <GameLayout>
        <WhoresContent />
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
