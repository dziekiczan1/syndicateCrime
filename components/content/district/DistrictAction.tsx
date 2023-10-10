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
  handleDistrictAction: (mission: IDistrictActions, action?: string) => void;
}

const DistrictAction = ({
  mission,
  handleDistrictAction,
}: IDistrictDetails) => {
  const { user } = useContext(UserContext);
  const [missionTime, setMissionTime] = useState(mission.missionTime);
  const [missionPercentage, setMissionPercentage] = useState(0);

  useEffect(() => {
    const missionSeconds = user?.district?.[mission.short]?.timeRemaining;
    const missionPercentage = calculatePercentage(mission.time, missionSeconds);
    const missionTime = formatTime(missionSeconds);
    setMissionTime(missionTime);
    setMissionPercentage(missionPercentage);
  }, [user, mission]);

  const formattedBonusMoney = formatNumber(mission.bonusOne);

  const isMissionInProgress =
    user?.district?.[mission.short]?.status === "inprogress";
  const missionsInProgress = user?.district?.missionsStatus === "inprogress";

  return (
    <>
      {isMissionInProgress && (
        <p className={`${styles.inProgress} tableHeading`}>
          Mission in progress:
        </p>
      )}
      <div
        className={`${styles.actionsContent} ${
          isMissionInProgress && styles.activeAction
        }`}
      >
        <div className={styles.actionImage}>
          <Image
            src={mission.imageSrc}
            width={600}
            height={300}
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
              <p className={styles.costName}>
                + {mission.bonusTwo} intelligence
              </p>
            </div>
            {isMissionInProgress && (
              <div className={styles.actionProgress}>
                {typeof missionPercentage === "number" && (
                  <ProgressBar name="Progress:" completed={missionPercentage} />
                )}
                <p>
                  <span className={styles.costName}>Time Left:</span>{" "}
                  {missionTime}
                </p>
              </div>
            )}
            <Button
              onClick={() =>
                isMissionInProgress
                  ? handleDistrictAction(mission, "abort")
                  : handleDistrictAction(mission)
              }
              secondary
              fullSize
              disabled={!isMissionInProgress && missionsInProgress}
            >
              {isMissionInProgress ? "Abort" : "Begin"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistrictAction;
