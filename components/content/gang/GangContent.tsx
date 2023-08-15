import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { gangActions } from "@/constants/actions/gangactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import GangAction from "./GangAction";
import styles from "./GangContent.module.scss";

const GangContent: React.FC = () => {
  const pageData = pageDescriptions.gang;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleGangAction = async (gang: any) => {
    await handleAction("/api/user/gangActions", { gang });
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
      <p className={styles.tableHeading}>Select a gang to stand with:</p>
      <div className={styles.actionsContainer}>
        {user &&
          gangActions.map((gang, key) => (
            <GangAction
              key={key}
              gang={gang}
              handleGangAction={handleGangAction}
            />
          ))}
      </div>
    </div>
  );
};

export default GangContent;
