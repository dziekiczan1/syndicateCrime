import { formatNumber } from "@/lib/money";
import { Whore } from "@/pages/api/user/whoresActions";

interface IActiveWhore {
  active: Whore;
}

const ActiveWhores: React.FC<IActiveWhore> = ({ active }) => {
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
    </tr>
  );
};

export default ActiveWhores;
