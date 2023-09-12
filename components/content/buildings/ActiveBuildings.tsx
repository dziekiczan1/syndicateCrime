import Button from "@/components/ui/button/Button";
import { formatNumber } from "@/lib/money";
import { Buildings } from "@/pages/api/user/buildingsActions";
import styles from "./BuildingsContent.module.scss";

interface IActiveBuildings {
  active: Buildings;
  handleBuildingsAction: (building: Buildings, action: string) => void;
}

const ActiveBuildings: React.FC<IActiveBuildings> = ({
  active,
  handleBuildingsAction,
}) => {
  return (
    <tr className={active.name === "Arena" ? styles.special : ""}>
      <td>
        <p>{active.name}</p>
      </td>
      <td>
        <p>{active.count}</p>
      </td>
      <td>
        <p>{formatNumber(active.bonus)}</p>
      </td>
      <td>
        <Button
          onClick={() => handleBuildingsAction(active, "sell")}
          fullSize
          disabled={active.name === "Arena"}
        >
          Sell
        </Button>
      </td>
    </tr>
  );
};

export default ActiveBuildings;
