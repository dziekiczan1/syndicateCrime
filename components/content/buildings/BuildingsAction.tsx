import Button from "@/components/ui/button/Button";
import { IBuildingsActions } from "@/constants/actions/buildingsactions";
import Image from "next/image";
import styles from "./BuildingsAction.module.scss";

const BuildingsAction = ({
  imageSrc,
  name,
  description,
  cost,
}: IBuildingsActions) => {
  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image src={imageSrc} width={300} height={150} alt={name} />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{name}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{description}</p>
          <p className={styles.actionCost}>{cost}</p>
          <Button onClick={() => {}} secondary fullSize>
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildingsAction;
