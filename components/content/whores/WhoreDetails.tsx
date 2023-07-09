import Button from "@/components/ui/button/Button";
import { IWhoresActions } from "@/constants/actions/whoresactions";
import { formatNumber } from "@/lib/money";
import { Whore } from "@/pages/api/user/whoresActions";
import { useEffect, useState } from "react";

interface IWhoreDetails {
  whore: IWhoresActions;
  handleWhoreAction: (whore: Whore, action: string) => void;
}

const WhoreDetails: React.FC<IWhoreDetails> = ({
  whore,
  handleWhoreAction,
}) => {
  const [formattedCost, setFormattedCost] = useState("");
  const [formattedEarnings, setFormattedEarnings] = useState("");

  useEffect(() => {
    const cost = formatNumber(whore.cost);
    const earnings = formatNumber(whore.earnings);
    setFormattedCost(cost);
    setFormattedEarnings(earnings);
  }, [whore]);

  return (
    <tr>
      <td>
        <p>{whore.name}</p>
      </td>
      <td>
        <p>{formattedCost}</p>
      </td>
      <td>
        <p>{formattedEarnings}</p>
      </td>
      <td>
        <Button
          onClick={() => handleWhoreAction(whore, "buy")}
          secondary
          fullSize
        >
          Buy
        </Button>
      </td>
    </tr>
  );
};

export default WhoreDetails;
