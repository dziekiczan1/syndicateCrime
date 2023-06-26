import { Freedom, Icon } from "@/components/ui/icons";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const { title, description } = pageDescriptions.prison;
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
      {user && !user.prison && (
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
    </div>
  );
};

export default PrisonContent;
