import Button from "@/components/ui/button/Button";
import Loading from "@/components/ui/loading/Loading";
import { formatNumber } from "@/lib/money";
import { MarketCompany } from "@/pages/api/user/marketActions";
import styles from "./MarketContent.module.scss";

interface IActiveCompany {
  active: MarketCompany;
  handleMarketAction: (
    company: any,
    action: string,
    newCurrentCost?: number
  ) => void;
  latestStockPrices: Record<string, number>;
}

const ActiveCompany: React.FC<IActiveCompany> = ({
  active,
  handleMarketAction,
  latestStockPrices,
}) => {
  const newCurrentPrice = latestStockPrices[active.name];

  if (typeof newCurrentPrice !== "number") {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <tr>
      <td>
        <p>{active.name}</p>
      </td>
      <td>
        <p>{active.count}</p>
      </td>
      <td>
        <p>{formatNumber(active.averageCost)}</p>
      </td>
      <td>
        <Button
          onClick={() => handleMarketAction(active, "sell", newCurrentPrice)}
          fullSize
        >
          Sell
        </Button>
      </td>
    </tr>
  );
};

export default ActiveCompany;
