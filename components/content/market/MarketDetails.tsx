import Button from "@/components/ui/button/Button";
import { ArrowDownIcon, ArrowUpIcon, Icon } from "@/components/ui/icons";
import { calculatePercentageChange } from "@/lib/marketactions";
import { formatNumber } from "@/lib/money";
import { useEffect, useState } from "react";
import { IMarketDataItem } from "./MarketContent";
import styles from "./MarketDetails.module.scss";

interface IWhoreDetails {
  company: IMarketDataItem;
  handleMarketAction: (company: any, action: string) => void;
}

const MarketDetails: React.FC<IWhoreDetails> = ({
  company,
  handleMarketAction,
}) => {
  const [formattedCost, setFormattedCost] = useState("");

  useEffect(() => {
    const cost = formatNumber(company.currentCost);
    setFormattedCost(cost);
  }, [company]);

  const percentageChange = calculatePercentageChange(
    company.currentCost,
    company.cost
  );
  const formattedPercentageChange = Math.abs(percentageChange);

  return (
    <tr>
      <td>
        <p>{company.name}</p>
      </td>
      <td>
        <p>{formattedCost}</p>
      </td>
      {percentageChange >= 0 ? (
        <td className={styles.changeUp}>
          <p className={styles.changeName}>
            {" "}
            <Icon
              component={ArrowUpIcon}
              width={20}
              height={20}
              viewBox="24 24"
            />
            {formattedPercentageChange.toFixed(2)}%
          </p>
        </td>
      ) : (
        <td className={styles.changeDown}>
          <p className={styles.changeName}>
            <Icon
              component={ArrowDownIcon}
              width={20}
              height={20}
              viewBox="24 24"
            />
            {formattedPercentageChange.toFixed(2)}%
          </p>
        </td>
      )}
      <td>
        <Button
          onClick={() => handleMarketAction(company, "buy")}
          secondary
          fullSize
        >
          Buy
        </Button>
      </td>
    </tr>
  );
};

export default MarketDetails;
