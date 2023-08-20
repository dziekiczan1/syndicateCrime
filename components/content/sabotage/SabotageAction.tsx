import Button from "@/components/ui/button/Button";
import UserContext, { IUser } from "@/store/user-context";
import { ObjectId } from "mongodb";
import { useContext } from "react";

interface ISabotagePlayers {
  player: IUser;
  handleSabotageAction: (playerId: string | ObjectId) => void;
}

const SabotageAction: React.FC<ISabotagePlayers> = ({
  player,
  handleSabotageAction,
}) => {
  const { user } = useContext(UserContext);
  const today = new Date().toISOString().split("T")[0];

  return (
    <tr>
      <td>
        <p>{player.username}</p>
      </td>
      <td>
        <p>
          {player.defaultParams.gang
            ? player.defaultParams.gang
            : "No gang affiliation"}
        </p>
      </td>
      <td>
        <p>{player.defaultParams.strength}</p>
      </td>
      <td>
        <Button
          onClick={() => handleSabotageAction(player._id)}
          secondary
          disabled={user?.sabotage?.sabotageHistory.some(
            (entry) => entry.date === today && entry.playerId === player._id
          )}
        >
          Sabotage!
        </Button>
      </td>
    </tr>
  );
};

export default SabotageAction;
