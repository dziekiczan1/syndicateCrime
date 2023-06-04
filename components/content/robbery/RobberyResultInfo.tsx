import styles from "./RobberyResultInfo.module.scss";

interface IProps {
  receivedData: any;
  animateRobberyResult: boolean;
}

const RobberyResultInfo: React.FC<IProps> = ({
  receivedData,
  animateRobberyResult,
}) => {
  return (
    <div
      className={`${styles.robberyResultInfo} ${
        !receivedData.robberySuccessful && styles.robberryFailed
      } ${animateRobberyResult && styles.robberyResultInfoShow}`}
    >
      {receivedData.robberyMoney ? (
        <>
          <p
            className={`${styles.message} ${
              !receivedData.robberySuccessful && styles.messageFailed
            }`}
          >
            {receivedData.message}
          </p>
          <p>
            You {receivedData.robberySuccessful ? "won: " : "lost: "}
            <span>${receivedData.robberyMoney.toLocaleString()}</span>
          </p>
          {receivedData.robberySuccessful && (
            <>
              <p>
                Strength: <span>{receivedData.strengthValue}</span>
              </p>
              <p>
                Intelligence: <span>{receivedData.intelligenceValue}</span>
              </p>
              <p>
                Endurance: <span>{receivedData.enduranceValue}</span>
              </p>
              <p>
                Charisma: <span>{receivedData.charismaValue}</span>
              </p>
            </>
          )}
        </>
      ) : (
        <p className={styles.messageFailed}>{receivedData.message}</p>
      )}
    </div>
  );
};

export default RobberyResultInfo;
