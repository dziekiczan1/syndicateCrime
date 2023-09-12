import Button from "@/components/ui/button/Button";
import { IAlleyActions } from "@/constants/actions/alleyactions";
import { formatNumber } from "@/lib/money";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./AlleyAction.module.scss";

interface IAlleyDetails {
  mission: IAlleyActions;
  handleAlleyAction: (mission: IAlleyActions) => void;
}

const AlleyAction = ({ mission, handleAlleyAction }: IAlleyDetails) => {
  const { user } = useContext(UserContext);
  const [formattedBonusMoney, setFormattedBonusMoney] = useState("");
  const [formattedHeistUser, setFormattedHeistUser] = useState("");
  const [formattedHeistReq, setFormattedHeistReq] = useState("");

  useEffect(() => {
    const bonusMoney = formatNumber(mission.bonus.money);
    const heistUserValue = formatNumber(
      mission.short === "heist" ? mission.userValue : mission.userValue
    );
    const heistReqValue = formatNumber(
      mission.short === "heist" ? mission.requiredValue : mission.requiredValue
    );
    setFormattedBonusMoney(bonusMoney);
    setFormattedHeistUser(heistUserValue);
    setFormattedHeistReq(heistReqValue);
  }, [mission]);

  const isMissionCompleted = (
    userValue: string | number,
    requiredValue: string | number
  ) => parseInt(String(userValue)) >= parseInt(String(requiredValue));

  return (
    <div className={styles.actionsContent}>
      {user && user.alley?.[mission.short] && (
        <div className={styles.courseCompleted}>
          <h2>Mission completed!</h2>
        </div>
      )}
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
              {mission.short === "heist"
                ? formattedHeistUser
                : mission.userValue}
            </p>
            <p className={styles.actionCost}>
              <span className={styles.costName}>Required: </span>
              {mission.short === "heist"
                ? formattedHeistReq
                : mission.requiredValue}
            </p>
          </div>
          <div className={styles.actionCosts}>
            <p className="custom-label">Bonus:</p>
            <p className={styles.costName}>+ {formattedBonusMoney}</p>
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
              !isMissionCompleted(mission.userValue, mission.requiredValue) ||
              user?.alley?.[mission.short]
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
