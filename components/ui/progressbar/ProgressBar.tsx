import styles from "./ProgressBar.module.scss";

export interface IProgressBar {
  name: string;
  completed: number;
  bgcolor?: string;
}

const ProgressBar: React.FC<IProgressBar> = ({
  completed,
  name,
  bgcolor = "linear-gradient(to left, #ffa500, #525252)",
}) => {
  return (
    <>
      <span className="custom-label">{name}</span>
      <div className={styles.container}>
        <div
          className={styles.filter}
          style={{ width: `${completed}%`, background: bgcolor }}
        >
          <span className={styles.label}>{`${completed}%`}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
