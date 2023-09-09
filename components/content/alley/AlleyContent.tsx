import PageHeader from "@/components/ui/pageheader/PageHeader";
import { alleyActions } from "@/constants/actions/alleyactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import styles from "./AlleyContent.module.scss";

const AlleyContent = () => {
  const pageData = pageDescriptions.alley;
  const { user } = useContext(UserContext);
  const alleyActionsList = alleyActions(user);

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {user &&
        alleyActionsList.map((action, key) => (
          <div key={key}>
            {action.name} | {action.userValue}
          </div>
        ))}
    </div>
  );
};

export default AlleyContent;
