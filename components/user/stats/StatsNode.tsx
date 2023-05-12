import styles from "./StatsNode.module.scss";

export interface IStatsNode {
  sampleTextProp: string;
}

const StatsNode: React.FC<IStatsNode> = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default StatsNode;
