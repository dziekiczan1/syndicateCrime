import { motion } from "framer-motion";
import styles from "./RobberyResultInfo.module.scss";

interface IProps {
  userLastRobbery: any;
}

const RobberyResultInfo: React.FC<IProps> = ({ userLastRobbery }) => {
  return (
    <motion.div
      className={`${styles.robberyResultInfo} ${
        !userLastRobbery.robberySuccessfull && styles.robberryFailed
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {userLastRobbery.robberyMoney ? (
        <>
          <p
            className={`${styles.message} ${
              !userLastRobbery.robberySuccessfull && styles.messageFailed
            }`}
          >
            {userLastRobbery.message}
          </p>
          <p>
            You {userLastRobbery.robberySuccessfull ? "won: " : "lost: "}
            <span>${userLastRobbery.robberyMoney.toLocaleString()}</span>
          </p>
          {userLastRobbery.robberySuccessfull && (
            <>
              <p>
                Strength: <span>{userLastRobbery.strengthValue}</span>
              </p>
              <p>
                Intelligence: <span>{userLastRobbery.intelligenceValue}</span>
              </p>
              <p>
                Endurance: <span>{userLastRobbery.enduranceValue}</span>
              </p>
              <p>
                Charisma: <span>{userLastRobbery.charismaValue}</span>
              </p>
              <p>
                Respect: <span>{userLastRobbery.respectValue}</span>
              </p>
            </>
          )}
        </>
      ) : (
        <p className={styles.messageFailed}>{userLastRobbery.message}</p>
      )}
    </motion.div>
  );
};

export default RobberyResultInfo;
