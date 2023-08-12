import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import { universityActions } from "@/constants/actions/universityactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
import UniversityAction from "./UniversityAction";
import styles from "./UniversityContent.module.scss";

const UniversityContent: React.FC = () => {
  const pageData = pageDescriptions.university;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);

  const handleUniversityAction = async (course: any) => {
    try {
      setIsLoadingCourse(true);

      const response = await fetch("/api/user/universityActions", {
        method: "POST",
        body: JSON.stringify({ course }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(response, setUser, setIsLoadingCourse);
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingCourse
        );
      }
    } catch (error) {
      console.error("Error processing buildings action.", error);
      setIsLoadingCourse(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <PageHeader pageData={pageData} />
      {isLoadingCourse && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <p className={styles.tableHeading}>Available courses:</p>
      <div className={styles.actionsContainer}>
        {user &&
          universityActions.map((action, key) => (
            <UniversityAction
              key={key}
              course={action}
              handleUniversityAction={handleUniversityAction}
            />
          ))}
      </div>
    </div>
  );
};

export default UniversityContent;
