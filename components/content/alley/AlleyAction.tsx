import Button from "@/components/ui/button/Button";
import { IAlleyActions } from "@/constants/actions/alleyactions";
import Image from "next/image";
import styles from "./AlleyAction.module.scss";

interface IAlleyDetails {
  mission: IAlleyActions;
  handleAlleyAction: (mission: any) => void;
}

const AlleyAction = ({ mission, handleAlleyAction }: IAlleyDetails) => {
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
            <p className={styles.actionCost}>
              <span className={styles.costName}>Required: </span>
              {mission.requiredValue}
            </p>
            <p className={styles.actionCost}>
              <span className={styles.costName}>Your value: </span>
              {mission.userValue}
            </p>
          </div>
          <Button onClick={() => handleAlleyAction(mission)} secondary fullSize>
            Collect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlleyAction;
