import Button from "@/components/ui/button/Button";
import { formatNumber } from "@/lib/money";
import { Buildings } from "@/pages/api/user/buildingsActions";

interface IActiveBuildings {
  active: Buildings;
  handleBuildingsAction: (building: Buildings, action: string) => void;
}

const ActiveBuildings: React.FC<IActiveBuildings> = ({
  active,
  handleBuildingsAction,
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
        <p>{formatNumber(active.bonus)}</p>
      </td>
      <td>
        <Button onClick={() => handleBuildingsAction(active, "sell")} fullSize>
          Sell
        </Button>
      </td>
    </tr>
  );
};

export default ActiveBuildings;
