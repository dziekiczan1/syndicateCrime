import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import Message from "@/components/ui/message/Message";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import TableThead from "@/components/ui/table/TableThead";
import { buildingsActions } from "@/constants/actions/buildingsactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import { Buildings } from "@/pages/api/user/buildingsActions";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
import ActiveBuildings from "./ActiveBuildings";
import BuildingsAction from "./BuildingsAction";
import styles from "./BuildingsContent.module.scss";

const BuildingsContent: React.FC = () => {
  const pageData = pageDescriptions.buildings;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingBuildings, setIsLoadingBuildings] = useState(false);

  const activeBuildingsTheads = ["Name", "Count", "Earnings per day", "Sell"];

  const handleBuildingsAction = async (building: Buildings, action: string) => {
    try {
      setIsLoadingBuildings(true);

      const response = await fetch("/api/user/buildingsActions", {
        method: "POST",
        body: JSON.stringify({ building, action }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(
          response,
          setUser,
          setIsLoadingBuildings,
          setActionMessage,
          timeoutId,
          setTimeoutId
        );
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingBuildings
        );
      }
    } catch (error) {
      console.error("Error processing buildings action.", error);
      setIsLoadingBuildings(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingBuildings && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {actionMessage && <Message message={actionMessage} />}
      {user && !user.buildings?.length ? (
        <p className={styles.tableHeading}>
          You don&apos;t owe any buildings at the moment.
        </p>
      ) : (
        <>
          <p className={styles.tableHeading}>Your current buildings:</p>
          <table className={`table ${styles.activeTable}`}>
            <TableThead columns={activeBuildingsTheads} />
            <tbody>
              {user &&
                user.buildings?.map((active, index) => (
                  <ActiveBuildings
                    key={index}
                    active={active}
                    handleBuildingsAction={handleBuildingsAction}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
      {
        <p className={styles.maxLimit}>
          Your current maximum limit for buildings is: <span>3</span>
        </p>
      }
      <p className={styles.tableHeading}>All buildings:</p>
      <div className={styles.actionsContainer}>
        {user &&
          buildingsActions.map((action, key) => (
            <BuildingsAction
              key={key}
              building={action}
              handleBuildingsAction={handleBuildingsAction}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildingsContent;
