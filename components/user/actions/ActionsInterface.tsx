import ActionNode from "@/components/ui/action/ActionNode";
import { RespectIcon } from "@/components/ui/icons";

import styles from "./ActionsInterface.module.scss";

const ActionsInterface: React.FC = () => {
  return (
    <div className={styles.container}>
      <ActionNode
        component={RespectIcon}
        fill="#666666"
        width={48}
        height={48}
        viewBox="512 512"
        actionName="Robbery"
      />
      <ActionNode
        component={RespectIcon}
        fill="#666666"
        width={48}
        height={48}
        viewBox="512 512"
        actionName="Robbery"
      />
      <ActionNode
        component={RespectIcon}
        fill="#666666"
        width={48}
        height={48}
        viewBox="512 512"
        actionName="Robbery"
      />
    </div>
  );
};

export default ActionsInterface;
