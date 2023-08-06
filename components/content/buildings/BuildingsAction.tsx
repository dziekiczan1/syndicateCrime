import Button from "@/components/ui/button/Button";
import { IBuildingsActions } from "@/constants/actions/buildingsactions";
import { formatNumber } from "@/lib/money";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BuildingsAction.module.scss";

interface IBuildingsDetails {
  building: IBuildingsActions;
  handleBuildingsAction: (building: any, action: string) => void;
}

const BuildingsAction = ({
  building,
  handleBuildingsAction,
}: IBuildingsDetails) => {
  const [formattedCost, setFormattedCost] = useState("");
  const [formattedBonus, setFormattedBonus] = useState("");

  useEffect(() => {
    const buildingCost = formatNumber(building.cost);
    const buildingBonus = formatNumber(building.bonus);
    setFormattedCost(buildingCost);
    setFormattedBonus(buildingBonus);
  }, [building]);

  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image
          src={building.imageSrc}
          width={300}
          height={150}
          alt={building.name}
        />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{building.name}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{building.description}</p>
          <div className={styles.actionCosts}>
            <p className={styles.actionCost}>
              <span className={styles.costName}>Cost: </span>
              {formattedCost}
            </p>
            <p className={styles.actionCost}>
              <span className={styles.costName}>Bonus: </span>
              {formattedBonus} / day
            </p>
          </div>
          <Button
            onClick={() => handleBuildingsAction(building, "buy")}
            secondary
            fullSize
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildingsAction;
