import Button from "@/components/ui/button/Button";
import { formatNumber } from "@/lib/money";
import { Whore } from "@/pages/api/user/whoresActions";
import styles from "./WhoresContent.module.scss";

interface IActiveWhore {
  active: Whore;
  handleWhoreAction: (whore: Whore, action: string) => void;
}

const ActiveWhores: React.FC<IActiveWhore> = ({
  active,
  handleWhoreAction,
}) => {
  return (
    <tr className={active.name === "Lollipop" ? styles.special : ""}>
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
        <Button
          onClick={() => handleWhoreAction(active, "fire")}
          fullSize
          disabled={active.name === "Lollipop"}
        >
          Fire
        </Button>
      </td>
    </tr>
  );
};

export default ActiveWhores;
