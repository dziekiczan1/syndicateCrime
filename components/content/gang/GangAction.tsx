import Button from "@/components/ui/button/Button";
import Image from "next/image";
import styles from "./GangAction.module.scss";

interface IGangDetails {
  gang: any;
  handleGangAction: (gang: any) => void;
}

const GangAction = ({ gang, handleGangAction }: IGangDetails) => {
  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image src={gang.imageSrc} width={600} height={360} alt={gang.name} />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{gang.name}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{gang.description}</p>
          <div className={styles.actionCosts}>
            <div className={styles.requirements}>
              <p className="custom-label">Requirements:</p>
              <p className={styles.actionCost}>
                <span className={styles.costName}>Respect: </span>
                {gang.minRespect}
              </p>
            </div>
            <div className={styles.bonus}>
              <p className="custom-label">Bonus:</p>
              <p className={styles.costName}>Bonus</p>
            </div>
          </div>
          <Button onClick={() => handleGangAction(gang)} secondary fullSize>
            Declare your loyalty!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GangAction;
