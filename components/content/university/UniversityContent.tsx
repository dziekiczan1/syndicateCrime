import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { universityActions } from "@/constants/actions/universityactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import { University } from "@/pages/api/user/universityActions";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import UniversityAction from "./UniversityAction";
import styles from "./UniversityContent.module.scss";

const UniversityContent: React.FC = () => {
  const pageData = pageDescriptions.university;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleUniversityAction = async (course: University) => {
    await handleAction("/api/user/universityActions", { course });
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
      <p className="tableHeading">Available courses:</p>
      <div className={styles.actionsContainer}>
        {user &&
          universityActions.map((course, key) => (
            <UniversityAction
              key={key}
              course={course}
              handleUniversityAction={handleUniversityAction}
            />
          ))}
      </div>
    </div>
  );
};

export default UniversityContent;
