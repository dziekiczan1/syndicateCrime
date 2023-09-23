import Button from "@/components/ui/button/Button";
import ProgressBar from "@/components/ui/progressbar/ProgressBar";
import { IDistrictActions } from "@/constants/actions/districtactions";
import { calculatePercentage, formatTime } from "@/lib/missionTime";
import { formatNumber } from "@/lib/money";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./DistrictAction.module.scss";

interface IDistrictDetails {
  mission: IDistrictActions;
  handleDistrictAction: (mission: IDistrictActions) => void;
}

const DistrictAction = ({
  mission,
  handleDistrictAction,
}: IDistrictDetails) => {
  const { user } = useContext(UserContext);
  const [formattedBonusMoney, setFormattedBonusMoney] = useState("");

  useEffect(() => {
    const bonusMoney = formatNumber(mission.bonusOne);
    setFormattedBonusMoney(bonusMoney);
  }, [mission]);

  const missionSeconds =
    user && user.district && user.district.grandmother.timeRemaining;
  const missionTime = missionSeconds && formatTime(missionSeconds);
  const newMissionTime = mission.time;
  const missionPercentage =
    missionSeconds && calculatePercentage(newMissionTime, missionSeconds);

  return (
    <div className={styles.actionsContent}>
      {user && user.district?.[mission.short]?.status === "finished" && (
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
            <p className={styles.actionCost}>
              <span className={styles.costName}>Time: </span>
              {mission.missionTime}
            </p>
          </div>
          <div className={styles.actionCosts}>
            <p className="custom-label">Bonus:</p>
            <p className={styles.costName}>+ {formattedBonusMoney}</p>
            <p className={styles.costName}>+ {mission.bonusOne} intelligence</p>
          </div>
          <div className={styles.actionProgress}>
            {typeof missionPercentage === "number" && (
              <ProgressBar name="Progress:" completed={missionPercentage} />
            )}
            <p>
              <span className={styles.costName}>Time Left:</span> {missionTime}
            </p>
          </div>
          <Button
            onClick={() => handleDistrictAction(mission)}
            secondary
            fullSize
          >
            Begin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DistrictAction;
