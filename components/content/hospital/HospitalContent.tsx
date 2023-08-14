import { useContext, useRef } from "react";

import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { hospitalActions } from "@/constants/actions/hospitalactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import HospitalAction from "./HospitalAction";
import styles from "./HospitalContent.module.scss";

const HospitalContent: React.FC = () => {
  const pageData = pageDescriptions.hospital;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleHospitalAction = async (action: (() => void) | string) => {
    await handleAction("/api/user/hospitalActions", { action });
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
          hospitalActions.map((action, key) => (
            <HospitalAction
              key={key}
              imageSrc={action.imageSrc}
              name={action.name}
              description={action.description}
              cost={action.cost}
              buttonText={action.buttonText}
              onAction={() => handleHospitalAction(action.onAction)}
            />
          ))}
      </div>
    </div>
  );
};

export default HospitalContent;
