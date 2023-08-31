import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import TableThead from "@/components/ui/table/TableThead";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import { MarketCompany } from "@/pages/api/user/marketActions";
import { useEffect, useRef, useState } from "react";
import styles from "./MarketContent.module.scss";
import MarketDetails from "./MarketDetails";

export interface IMarketDataItem {
  name: string;
  cost: number;
  currentCost: number;
}

const MarketContent: React.FC = () => {
  const pageData = pageDescriptions.market;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [marketData, setMarketData] = useState<IMarketDataItem[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const allMarketTheads = ["Name", "Cost", "Change", "Buy"];

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MARKETAPI_URL}/api/market`
        );
        if (!response.ok) {
          setIsFetching(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMarketData(data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsFetching(false);
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

  const handleMarketAction = async (company: MarketCompany, action: string) => {
    await handleAction("/api/user/marketActions", { company, action });
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
      <p className="tableHeading">All companies:</p>
      {isFetching ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <div className={styles.tableWrapper}>
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
        </div>
      )}
    </div>
  );
};

export default MarketContent;
