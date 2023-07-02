import Button from "@/components/ui/button/Button";
import { IHospitalActions } from "@/constants/hospitalactions";
import Image from "next/image";
import styles from "./HospitalAction.module.scss";

const HospitalAction = ({
  imageSrc,
  name,
  description,
  cost,
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
          <p className={styles.actionCost}>{cost}</p>
          <Button onClick={onAction as () => void} secondary fullSize>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalAction;
