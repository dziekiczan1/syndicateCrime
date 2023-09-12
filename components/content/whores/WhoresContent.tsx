import { useContext, useRef } from "react";

import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import TableThead from "@/components/ui/table/TableThead";
import { whoresActions } from "@/constants/actions/whoresactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import { Whore } from "@/pages/api/user/whoresActions";
import UserContext from "@/store/user-context";
import ActiveWhores from "./ActiveWhores";
import WhoreDetails from "./WhoreDetails";
import styles from "./WhoresContent.module.scss";

const WhoresContent: React.FC = () => {
  const pageData = pageDescriptions.whores;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const isAlleySabotage = user?.alley?.sabotage;
  const isAlleyIntelligence = user?.alley?.intelligence;
  const isUserPimp = user?.university?.pimp;

  let whoresMaxLimit = 5;

  if (isUserPimp) {
    whoresMaxLimit = 10;
  }

  if (isAlleySabotage) {
    whoresMaxLimit += 1;
  }

  if (isAlleyIntelligence) {
    whoresMaxLimit += 2;
  }

  const activeWhoreTheads = ["Name", "Count", "Earnings per day", "Manage"];
  const allWhoresTheads = ["Name", "Cost", "Earnings per day", "Buy"];

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleWhoreAction = async (whore: Whore, action: string) => {
    await handleAction("/api/user/whoresActions", { whore, action });
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
      {user && !user.whores?.length ? (
        <p className="tableHeading">
          You don&apos;t have any active whores at the moment.
        </p>
      ) : (
        <>
          <p className="tableHeading">Your active whores:</p>
          <table className="table activeTable">
            <TableThead columns={activeWhoreTheads} />
            <tbody>
              {user &&
                user.whores?.map((active, index) => (
                  <ActiveWhores
                    key={index}
                    active={active}
                    handleWhoreAction={handleWhoreAction}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
      {
        <p className="maxLimit">
          Your current maximum limit for whores is:{" "}
          <span>{user && whoresMaxLimit}</span>
        </p>
      }
      <p className="tableHeading">All whores:</p>
      <table className="table activeTable">
        <TableThead columns={allWhoresTheads} />
        <tbody>
          {whoresActions.map((whore, index) => (
            <WhoreDetails
              key={index}
              whore={whore}
              handleWhoreAction={handleWhoreAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WhoresContent;
