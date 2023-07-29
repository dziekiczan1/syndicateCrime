import ActionNode from "@/components/ui/action/ActionNode";
import { CloseMobileIcon, Icon } from "@/components/ui/icons";
import userActions from "@/constants/actions/mainactions";

import styles from "./ActionsInterface.module.scss";

export interface IActionsInterface {
  isActionsInterfaceVisible?: boolean;
  handleActionsClick: () => void;
}

const ActionsInterface: React.FC<IActionsInterface> = ({
  isActionsInterfaceVisible,
  handleActionsClick,
}) => {
  return (
    <ul
      className={`${styles.container} ${
        isActionsInterfaceVisible && styles.mobileOpen
      }`}
    >
      {isActionsInterfaceVisible && (
        <div onClick={handleActionsClick} className={styles.mobileClose}>
          <Icon
            component={CloseMobileIcon}
            width={48}
            height={48}
            viewBox="24 24"
          />
        </div>
      )}
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
