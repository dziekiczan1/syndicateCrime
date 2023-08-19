import Button from "@/components/ui/button/Button";
import { IUser } from "@/store/user-context";

interface ISabotagePlayers {
  player: IUser;
  handleSabotageAction: (playerId: string) => void;
}

const SabotageAction: React.FC<ISabotagePlayers> = ({
  player,
  handleSabotageAction,
}) => {
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
        <Button onClick={() => handleSabotageAction(player._id)} fullSize>
          Sabotage!
        </Button>
      </td>
    </tr>
  );
};

export default SabotageAction;
