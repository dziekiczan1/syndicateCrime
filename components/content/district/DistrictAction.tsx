import Button from "@/components/ui/button/Button";
import { IDistrictActions } from "@/constants/actions/districtactions";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext } from "react";
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
