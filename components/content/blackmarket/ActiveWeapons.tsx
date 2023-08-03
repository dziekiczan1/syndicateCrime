import Button from "@/components/ui/button/Button";
import { Weapon } from "@/pages/api/user/blackmarketActions";

interface IActiveWeapons {
  active: Weapon;
  handleWeaponAction: (weapon: Weapon, action: string) => void;
}

const ActiveWeapons: React.FC<IActiveWeapons> = ({
  active,
  handleWeaponAction,
}) => {
  return (
    <tr>
      <td>
        <p>{active.name}</p>
      </td>
      <td>
        <p>{active.count}</p>
      </td>
      <td>
        <p>{active.respect}</p>
      </td>
      <td>
        <Button onClick={() => handleWeaponAction(active, "discard")} fullSize>
          Discard
        </Button>
      </td>
    </tr>
  );
};

export default ActiveWeapons;
