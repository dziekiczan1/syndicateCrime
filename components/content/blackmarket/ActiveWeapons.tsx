import Button from "@/components/ui/button/Button";
import { Weapon } from "@/pages/api/user/blackmarketActions";
import styles from "./BlackmarketContent.module.scss";

interface IActiveWeapons {
  active: Weapon;
  handleWeaponAction: (weapon: Weapon, action: string) => void;
}

const ActiveWeapons: React.FC<IActiveWeapons> = ({
  active,
  handleWeaponAction,
}) => {
  return (
    <tr className={active.name === "Venom" ? styles.special : ""}>
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
