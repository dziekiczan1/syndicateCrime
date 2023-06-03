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
  const isCompletedLessThanTen = completed < 20 && true;

  return (
    <>
      <span className="custom-label">{name}</span>
      <div className={styles.container}>
        <div
          className={styles.progressBg}
          style={{ width: `${completed}%`, background: bgcolor }}
        >
          <span
            className={styles.progressText}
            style={{
              color: isCompletedLessThanTen ? "#f5f5f5" : "#333333",
              marginRight: isCompletedLessThanTen ? "0" : "0.4rem",
            }}
          >{`${completed}%`}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
