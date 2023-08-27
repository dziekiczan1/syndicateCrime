import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import TableThead from "@/components/ui/table/TableThead";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { useEffect, useState } from "react";
import styles from "./MarketContent.module.scss";
import MarketDetails from "./MarketDetails";

export interface IMarketDataItem {
  name: string;
  cost: number;
  currentCost: number;
}

const MarketContent: React.FC = () => {
  const pageData = pageDescriptions.market;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [marketData, setMarketData] = useState<IMarketDataItem[]>([]);

  const allMarketTheads = ["Name", "Cost", "Change", "Buy"];

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MARKETAPI_URL}/api/market`
        );
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMarketData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
      }
    };

    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "marketUpdate") {
        setMarketData(message.payload);
      }
    });

    fetchMarketData();
  }, []);

  const handleMarketAction = async (company: any, action: string) => {};

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <p className="tableHeading">All companies:</p>
      <div className={styles.tableWrapper}>
        {isLoading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : (
          <table className="table activeTable">
            <TableThead columns={allMarketTheads} />
            <tbody>
              {marketData.map((company, index) => (
                <MarketDetails
                  key={index}
                  company={company}
                  handleMarketAction={handleMarketAction}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MarketContent;
