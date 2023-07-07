import { useContext, useState } from "react";

import Button from "@/components/ui/button/Button";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import {
  IWhoresActions,
  whoresActions,
} from "@/constants/actions/whoresactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import styles from "./WhoresContent.module.scss";

const WhoresContent: React.FC = () => {
  const pageData = pageDescriptions.whores;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingWhores, setIsLoadingWhores] = useState(false);

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
      <table className="table">
        <thead>
          <tr>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Cost</p>
            </th>
            <th>
              <p>Earnings per day</p>
            </th>
            <th>
              <p>Buy</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {whoresActions.map((whore, index) => (
            <tr key={index}>
              <td>
                <p>{whore.name}</p>
              </td>
              <td>
                <p>${whore.cost.toLocaleString()}</p>
              </td>
              <td>
                <p>${whore.earnings.toLocaleString()}</p>
              </td>
              <td>
                <Button onClick={() => handleBuy(whore)} secondary fullSize>
                  Buy
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WhoresContent;
