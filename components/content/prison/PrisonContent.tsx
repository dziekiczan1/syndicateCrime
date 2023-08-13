import { useContext, useState } from "react";

import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import Message from "@/components/ui/message/Message";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import { prisonActions } from "@/constants/actions/prisonactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import prisonImages from "@/constants/images/prison";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import Image from "next/image";
import PrisonAction from "./PrisonAction";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const pageData = pageDescriptions.prison;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [positiveTimeoutId, setPositiveTimeoutId] = useState<number | null>(
    null
  );
  const [isLoadingPrison, setIsLoadingPrison] = useState(false);

  const handleAction = async (action: (() => void) | string) => {
    try {
      setIsLoadingPrison(true);
      const response = await fetch("/api/user/prisonActions", {
        method: "POST",
        body: JSON.stringify({ action }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(
          response,
          setUser,
          setIsLoadingPrison,
          setActionMessage,
          positiveTimeoutId,
          setPositiveTimeoutId
        );
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingPrison
        );
      }
    } catch (error) {
      console.error("Error processing bank action.", error);
      setIsLoadingPrison(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingPrison && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        actionMessage && <Message message={actionMessage} />
      )}
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
              onAction={() => handleAction(action.onAction)}
            />
          ))}
      </div>
    </div>
  );
};

export default PrisonContent;
