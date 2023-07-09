import { useContext, useState } from "react";

import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import TableThead from "@/components/ui/table/TableThead";
import {
  IWhoresActions,
  whoresActions,
} from "@/constants/actions/whoresactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import ActiveWhores from "./ActiveWhores";
import WhoreDetails from "./WhoreDetails";
import styles from "./WhoresContent.module.scss";

const WhoresContent: React.FC = () => {
  const pageData = pageDescriptions.whores;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingWhores, setIsLoadingWhores] = useState(false);

  const activeWhoreTheads = ["Name", "Count", "Earnings per day"];
  const allWhoresTheads = ["Name", "Cost", "Earnings per day", "Buy"];

  const handleBuy = async (whore: IWhoresActions) => {
    try {
      setIsLoadingWhores(true);

      const response = await fetch("/api/user/whoresActions", {
        method: "POST",
        body: JSON.stringify({ whore }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(response, setUser, setIsLoadingWhores);
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingWhores
        );
      }
    } catch (error) {
      console.error("Error processing bank action.", error);
      setIsLoadingWhores(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingWhores && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {user && !user.whores ? (
        <p className={styles.tableHeading}>
          You don&apos;t currently have any whores working for you.
        </p>
      ) : (
        <>
          <p className={styles.tableHeading}>Your active whores:</p>
          <table className={`table ${styles.activeTable}`}>
            <TableThead columns={activeWhoreTheads} />
            <tbody>
              {user &&
                user.whores?.map((active, index) => (
                  <ActiveWhores key={index} active={active} />
                ))}
            </tbody>
          </table>
        </>
      )}
      <p className={styles.tableHeading}>All whores:</p>
      <table className={`table ${styles.activeTable}`}>
        <TableThead columns={allWhoresTheads} />
        <tbody>
          {whoresActions.map((whore, index) => (
            <WhoreDetails key={index} whore={whore} handleBuy={handleBuy} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WhoresContent;
