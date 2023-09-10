import Button from "@/components/ui/button/Button";
import { IAlleyActions } from "@/constants/actions/alleyactions";
import Image from "next/image";
import styles from "./AlleyAction.module.scss";

interface IAlleyDetails {
  mission: IAlleyActions;
  handleAlleyAction: (mission: IAlleyActions) => void;
}

const AlleyAction = ({ mission, handleAlleyAction }: IAlleyDetails) => {
  const isMissionCompleted = (
    userValue: string | number,
    requiredValue: string | number
  ) => parseInt(String(userValue)) >= parseInt(String(requiredValue));

  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image
          src={mission.imageSrc}
          width={300}
          height={150}
          alt={mission.name}
        />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{mission.name}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{mission.description}</p>
          <div className={styles.actionCosts}>
            <p className="custom-label">Requirements:</p>
            <p
              className={`${styles.actionCost} ${
                isMissionCompleted(mission.userValue, mission.requiredValue)
                  ? styles.success
                  : styles.failed
              }`}
            >
              <span className={styles.costName}>Your value: </span>
              {mission.userValue}
            </p>
            <p className={styles.actionCost}>
              <span className={styles.costName}>Required: </span>
              {mission.requiredValue}
            </p>
          </div>
          <div className={styles.actionCosts}>
            <p className="custom-label">Bonus:</p>
            <p className={styles.costName}>+ {mission.bonus.money}</p>
            <p className={styles.costName}>
              + {mission.bonus.statValue} {mission.bonus.stat}
            </p>
            <p className={styles.costName}>+ {mission.bonus.extra}</p>
          </div>
          <Button
            onClick={() => handleAlleyAction(mission)}
            secondary
            fullSize
            disabled={
              !isMissionCompleted(mission.userValue, mission.requiredValue)
            }
          >
            Collect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlleyAction;
