import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import TableThead from "@/components/ui/table/TableThead";
import { buildingsActions } from "@/constants/actions/buildingsactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import { Buildings } from "@/pages/api/user/buildingsActions";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import ActiveBuildings from "./ActiveBuildings";
import BuildingsAction from "./BuildingsAction";
import styles from "./BuildingsContent.module.scss";

const BuildingsContent: React.FC = () => {
  const pageData = pageDescriptions.buildings;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const activeBuildingsTheads = ["Name", "Count", "Earnings per day", "Sell"];

  const handleBuildingsAction = async (building: Buildings, action: string) => {
    await handleAction("/api/user/buildingsActions", { building, action });
  };

  const isAlleyHeist = user?.alley?.heist;
  const isAlleyUniversity = user?.alley?.university;
  const isUserArchitecture = user?.university?.architecture;

  let buildingsMaxLimit = 3;

  if (isUserArchitecture) {
    buildingsMaxLimit = 8;
  }

  if (isAlleyHeist) {
    buildingsMaxLimit += 1;
  }

  if (isAlleyUniversity) {
    buildingsMaxLimit += 2;
  }

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
      {user && !user.buildings?.length ? (
        <p className="tableHeading">
          You don&apos;t owe any buildings at the moment.
        </p>
      ) : (
        <>
          <p className="tableHeading">Your current buildings:</p>
          <table className="table activeTable">
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
        <p className="maxLimit">
          Your current maximum limit for buildings is:{" "}
          <span>{user && buildingsMaxLimit}</span>
        </p>
      }
      <p className="tableHeading">All buildings:</p>
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
