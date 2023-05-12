import Icon from "@/components/ui/icons/Icon";
import styles from "./StatsNode.module.scss";

export interface IStatsNode {
  component: React.FC<{ fill?: string }>;
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  statsValue: number;
  statsName: string;
}

const StatsNode: React.FC<IStatsNode> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  statsValue,
  statsName,
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
        <p className={styles.statsValue}>{statsValue}</p>
        <p className="custom-label">{statsName}</p>
      </div>
    </div>
  );
};

export default StatsNode;
