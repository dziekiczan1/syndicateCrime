import GameLayout from "@/components/layout/game/GameLayout";
import UserContext from "@/store/user-context";
import { useContext } from "react";

export default function Robbery() {
  const { user } = useContext(UserContext);
  return <GameLayout>:=)</GameLayout>;
}
