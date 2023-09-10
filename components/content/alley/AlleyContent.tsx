import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { alleyActions } from "@/constants/actions/alleyactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import AlleyAction from "./AlleyAction";
import styles from "./AlleyContent.module.scss";

const AlleyContent = () => {
  const pageData = pageDescriptions.alley;
  const { user } = useContext(UserContext);
  const alleyActionsList = alleyActions(user);
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleAlleyAction = async (mission: any) => {
    await handleAction("/api/user/alleyActions", { mission });
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
      <div className={styles.actionsContainer}>
        {user &&
          alleyActionsList.map((action, key) => (
            <AlleyAction
              key={key}
              mission={action}
              handleAlleyAction={handleAlleyAction}
            />
          ))}
      </div>
    </div>
  );
};

export default AlleyContent;
