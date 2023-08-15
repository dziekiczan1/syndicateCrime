import Button from "@/components/ui/button/Button";
import { IBlackMarketActions } from "@/constants/actions/blackmarketactions";
import { formatNumber } from "@/lib/money";
import { Weapon } from "@/pages/api/user/blackmarketActions";
import { useEffect, useState } from "react";

interface IWeaponDetails {
  weapon: IBlackMarketActions;
  handleWeaponAction: (weapon: Weapon, action: string) => void;
}

const WeaponDetails: React.FC<IWeaponDetails> = ({
  weapon,
  handleWeaponAction,
}) => {
  const [formattedCost, setFormattedCost] = useState("");

  useEffect(() => {
    const cost = formatNumber(weapon.cost);
    setFormattedCost(cost);
  }, [weapon]);

  return (
    <tr>
      <td>
        <p>{weapon.name}</p>
      </td>
      <td>
        <p>{formattedCost}</p>
      </td>
      <td>
        <p>{weapon.respect}</p>
      </td>
      <td>
        <Button
          onClick={() => handleWeaponAction(weapon, "buy")}
          secondary
          fullSize
        >
          Buy
        </Button>
      </td>
    </tr>
  );
};

export default WeaponDetails;
