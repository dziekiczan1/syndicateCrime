import Button from "@/components/ui/button/Button";
import { IWhoresActions } from "@/constants/actions/whoresactions";
import { formatNumber } from "@/lib/money";
import { useEffect, useState } from "react";

interface IWhoreDetails {
  whore: IWhoresActions;
  handleBuy: (whore: IWhoresActions) => void;
}

const WhoreDetails: React.FC<IWhoreDetails> = ({ whore, handleBuy }) => {
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
        <Button onClick={() => handleBuy(whore)} secondary fullSize>
          Buy
        </Button>
      </td>
    </tr>
  );
};

export default WhoreDetails;
