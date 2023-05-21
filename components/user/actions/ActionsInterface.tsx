import ActionNode from "@/components/ui/action/ActionNode";
import userActions from "@/constants/actions";

import styles from "./ActionsInterface.module.scss";

const ActionsInterface: React.FC = () => {
  return (
    <ul className={styles.container}>
      {userActions.map((action) => (
        <ActionNode
          key={action.actionName}
          component={action.component}
          width={action.width}
          height={action.height}
          viewBox={action.viewBox}
          actionName={action.actionName}
          href={action.href}
        />
      ))}
    </ul>
  );
};

export default ActionsInterface;
