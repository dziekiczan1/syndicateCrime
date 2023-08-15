import Button from "@/components/ui/button/Button";
import { IHospitalActions } from "@/constants/actions/hospitalactions";
import Image from "next/image";
import styles from "./HospitalAction.module.scss";

const HospitalAction = ({
  imageSrc,
  name,
  description,
  costEnergy,
  costMoney,
  bonus,
  buttonText,
  onAction,
}: IHospitalActions) => {
  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image src={imageSrc} width={65} height={65} alt={name} />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{name}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{description}</p>
          <div className={styles.medicinesInformation}>
            <div className={styles.medicinesCost}>
              <p className="custom-label">Cost:</p>
              {costEnergy && (
                <p className={styles.medicinesStats}>
                  Energy: <span>{costEnergy}</span>
                </p>
              )}
              {costMoney && (
                <p className={styles.medicinesStats}>
                  Money: <span>{costMoney}</span>
                </p>
              )}
            </div>
            <div className={styles.medicinesBonus}>
              <p className="custom-label">Bonus:</p>
              <p className={styles.medicinesStats}>{bonus}</p>
            </div>
          </div>
          <Button onClick={onAction as () => void} secondary fullSize>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalAction;
