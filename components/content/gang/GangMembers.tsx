import { IUser } from "@/store/user-context";

interface IGangMembers {
  player: IUser;
}

const GangMembers: React.FC<IGangMembers> = ({ player }) => {
  return (
    <tr>
      <td>
        <p>{player.username}</p>
      </td>
      <td>
        <p>{player.defaultParams.respect}</p>
      </td>
      <td>
        <p>{player.defaultParams.strength}</p>
      </td>
      <td>
        <p>{player.defaultParams.intelligence}</p>
      </td>
      <td>
        <p>{player.defaultParams.charisma}</p>
      </td>
    </tr>
  );
};

export default GangMembers;
