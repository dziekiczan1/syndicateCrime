import { useContext, useRef } from "react";

import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { prisonActions } from "@/constants/actions/prisonactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import prisonImages from "@/constants/images/prison";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import Image from "next/image";
import PrisonAction from "./PrisonAction";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const pageData = pageDescriptions.prison;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handlePrisonAction = async (action: (() => void) | string) => {
    await handleAction("/api/user/prisonActions", { action });
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
      {user && !user.prison?.isPrisoner && (
        <div className={styles.freedom}>
          <Image
            src={prisonImages.freedom}
            alt="Freedom"
            width={680}
            height={360}
            className="sectionImage"
          />
          <p className={styles.freedomText}>You are a free person...</p>
        </div>
      )}
      <div className={styles.actionsContainer}>
        {user && user.prison?.isPrisoner && (
          <div className={styles.prisonStats}>
            <h4>You end up behind bars. Freedom will have to wait.</h4>
            <p>
              You already escaped <span>{user.prison?.escapes}</span>{" "}
              {user.prison?.escapes === 1 ? "time" : "times"}
            </p>
            <p>
              You already bailed out <span>{user.prison?.bailouts}</span>{" "}
              {user.prison?.bailouts === 1 ? "time" : "times"}
            </p>
          </div>
        )}
        {user &&
          user.prison?.isPrisoner &&
          prisonActions.map((action, key) => (
            <PrisonAction
              key={key}
              imageSrc={action.imageSrc}
              name={action.name}
              description={action.description}
              cost={action.cost}
              buttonText={action.buttonText}
              onAction={() => handlePrisonAction(action.onAction)}
            />
          ))}
      </div>
    </div>
  );
};

export default PrisonContent;
