import Image from "next/image";
import { useContext, useState } from "react";

import Button from "@/components/ui/button/Button";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import { Freedom, Icon } from "@/components/ui/icons";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const { title, description } = pageDescriptions.prison;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingPrison, setIsLoadingPrison] = useState(false);

  const handleAction = async (action: string) => {
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
      {user && !user.prison && (
        <div className={styles.actions}>
          <Button onClick={() => handleAction("escape")}>Escape</Button>
          <Button onClick={() => handleAction("bailout")}>Bail Out</Button>
        </div>
      )}
      {user && !user.prison && (
        <div className={styles.methodsContent}>
          <div className={styles.methodImage}>
            <Image
              src="/assets/prison/escape.webp"
              width={65}
              height={65}
              alt="escape"
            />
          </div>
          <div className={styles.methodInformation}>
            <p className={styles.methodName}>Name</p>
            <div>
              <p className={styles.methodStats}>Name</p>
            </div>
          </div>
          <Button onClick={() => handleAction("escape")} secondary>
            Escape
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrisonContent;
