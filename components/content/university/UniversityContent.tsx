import PageHeader from "@/components/ui/pageheader/PageHeader";
import { universityActions } from "@/constants/actions/universityactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import UniversityAction from "./UniversityAction";
import styles from "./UniversityContent.module.scss";

const UniversityContent: React.FC = () => {
  const pageData = pageDescriptions.university;
  const { user, setUser } = useContext(UserContext);

  const handleUniversityAction = async () => {};

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
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
