import Icon from "@/components/ui/icons/Icon";
import Link from "next/link";
import styles from "./ActionNode.module.scss";

export interface IActionNode {
  component: React.FC<{ fill?: string }>;
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  actionName: string;
  href: string;
}

const ActionNode: React.FC<IActionNode> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  actionName,
  href,
}) => {
  return (
    <Link href={href} className={styles.container}>
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
        <div className={styles.name}>
          <p className="custom-label">{actionName}</p>
        </div>
      </div>
    </Link>
  );
};

export default ActionNode;
