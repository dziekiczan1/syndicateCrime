import Button from "@/components/ui/button/Button";
import { formatNumber } from "@/lib/money";
import { Whore } from "@/pages/api/user/whoresActions";

interface IActiveWhore {
  active: Whore;
  handleWhoreAction: (whore: Whore, action: string) => void;
}

const ActiveWhores: React.FC<IActiveWhore> = ({
  active,
  handleWhoreAction,
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
        <p>{formatNumber(active.earnings)}</p>
      </td>
      <td>
        <Button onClick={() => handleWhoreAction(active, "fire")} fullSize>
          Fire
        </Button>
      </td>
    </tr>
  );
};

export default ActiveWhores;
