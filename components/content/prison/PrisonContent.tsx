import { useContext, useState } from "react";

import ErrorMessage from "@/components/ui/error/ErrorMessage";
import { Freedom, Icon } from "@/components/ui/icons";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { prisonActions } from "@/constants/prisonactions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import PrisonAction from "./PrisonAction";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const { title, description } = pageDescriptions.prison;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingPrison, setIsLoadingPrison] = useState(false);

  const handleAction = async (action: (() => void) | string) => {
    try {
      setIsLoadingPrison(true);
      const response = await fetch("/api/user/prisonActions", {
        method: "POST",
        body: JSON.stringify(action),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(response, setUser, setIsLoadingPrison);
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
      <PageHeader title={title} description={description} />
      {isLoadingPrison && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {user && user.prison && (
        <div className={styles.freedom}>
          <Icon
            component={Freedom}
            width={200}
            height={200}
            viewBox="494 494"
          />
          <p>You are a free person...</p>
        </div>
      )}
      <div className={styles.actionsContainer}>
        {user &&
          !user.prison &&
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
