import WhoresContent from "@/components/content/whores/WhoresContent";
import GameLayout from "@/components/layout/game/GameLayout";
import Loading from "@/components/ui/loading/Loading";
import useUserStatus from "@/lib/useUserStatus";
import { withPrisonCheck } from "@/lib/withPrisonCheck";
import { withSessionCheck } from "@/lib/withSessionCheck";

export default function WhoresScreen() {
  const isUserAuthorized = useUserStatus();

  if (isUserAuthorized) {
    return (
      <GameLayout>
        <WhoresContent />
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="flex items-center justify-center">
        <Loading />
      </div>
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
