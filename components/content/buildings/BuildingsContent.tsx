import PageHeader from "@/components/ui/pageheader/PageHeader";
import { buildingsActions } from "@/constants/actions/buildingsactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import BuildingsAction from "./BuildingsAction";
import styles from "./BuildingsContent.module.scss";

const BuildingsContent: React.FC = () => {
  const pageData = pageDescriptions.buildings;
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.actionsContainer}>
        {user &&
          buildingsActions.map((action, key) => (
            <BuildingsAction
              key={key}
              imageSrc={action.imageSrc}
              name={action.name}
              description={action.description}
              cost={action.cost}
            />
          ))}
      </div>
    </div>
  );
};

export default BuildingsContent;
