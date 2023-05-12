import Icon from "@/components/ui/icons/Icon";
import styles from "./StatsNode.module.scss";

export interface IStatsNode {
  component: React.FC<{ fill?: string }>;
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  stats: number;
}

const StatsNode: React.FC<IStatsNode> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  stats,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icon
          component={component}
          width={width}
          height={height}
          fill={fill}
          viewBox={viewBox}
        />
      </div>
      <div className={styles.stats}>
        <p>{stats}</p>
      </div>
    </div>
  );
};

export default StatsNode;
