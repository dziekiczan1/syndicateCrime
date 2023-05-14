import Icon from "@/components/ui/icons/Icon";
import styles from "./ActionNode.module.scss";

export interface IActionNode {
  component: React.FC<{ fill?: string }>;
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  actionName: string;
}

const ActionNode: React.FC<IActionNode> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  actionName,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <div className={styles.icon}>
          <Icon
            component={component}
            width={width}
            height={height}
            fill={fill}
            viewBox={viewBox}
          />
        </div>
        <div>{actionName}</div>
      </div>
    </div>
  );
};

export default ActionNode;
