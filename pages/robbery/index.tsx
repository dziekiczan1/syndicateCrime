import GameLayout from "@/components/layout/game/GameLayout";
import UserContext from "@/store/user-context";
import { useContext } from "react";

export default function Robbery() {
  const { user } = useContext(UserContext);
  console.log("robek", user);
  return (
    <GameLayout>
      <h3>THIS</h3>
      <h2>IS</h2>
      <h1>ROBBERY</h1>
      {user?.username}
    </GameLayout>
  );
}
