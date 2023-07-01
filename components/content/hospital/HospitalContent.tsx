import { useContext, useState } from "react";

import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { prisonActions } from "@/constants/prisonactions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import HospitalAction from "./HospitalAction";
import styles from "./HospitalContent.module.scss";

const HospitalContent: React.FC = () => {
  const pageData = pageDescriptions.hospital;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingHospital, setIsLoadingHospital] = useState(false);

  const handleAction = async (action: (() => void) | string) => {
    try {
      setIsLoadingHospital(true);
      const response = await fetch("/api/user/prisonActions", {
        method: "POST",
        body: JSON.stringify({ action }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(response, setUser, setIsLoadingHospital);
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingHospital
        );
      }
    } catch (error) {
      console.error("Error processing bank action.", error);
      setIsLoadingHospital(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingHospital && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <div className={styles.actionsContainer}>
        {user &&
          prisonActions.map((action, key) => (
            <HospitalAction
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

export default HospitalContent;
