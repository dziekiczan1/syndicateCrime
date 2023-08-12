import Button from "@/components/ui/button/Button";
import { formatNumber } from "@/lib/money";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./UniversityAction.module.scss";

interface IUniversityDetails {
  course: any;
  handleUniversityAction: () => void;
}

const UniversityAction = ({
  course,
  handleUniversityAction,
}: IUniversityDetails) => {
  const [formattedCost, setFormattedCost] = useState("");

  useEffect(() => {
    const courseCost = formatNumber(course.cost);
    setFormattedCost(courseCost);
  }, [course]);

  return (
    <div className={styles.actionsContent}>
      <div className={styles.actionImage}>
        <Image
          src={course.imageSrc}
          width={600}
          height={360}
          alt={course.name}
        />
      </div>
      <div className={styles.actionInformation}>
        <p className={styles.actionName}>{course.title}</p>
        <div className={styles.actionDetails}>
          <p className={styles.actionDescription}>{course.description}</p>
          <div className={styles.actionCosts}>
            <div className={styles.requirements}>
              <p className="custom-label">Requirements:</p>
              <p className={styles.actionCost}>
                <span className={styles.costName}>Cost: </span>
                {formattedCost}
              </p>
              <p className={styles.actionCost}>
                <span className={styles.costName}>Respect: </span>
                {course.reqRespect}
              </p>
              <p className={styles.actionCost}>
                <span className={styles.costName}>{course.reqName}: </span>
                {course.reqValue}
              </p>
            </div>
            <div className={styles.bonus}>
              <p className="custom-label">Bonus:</p>
              <p className={styles.costName}>{course.bonus}</p>
            </div>
          </div>
          <Button onClick={() => handleUniversityAction()} secondary fullSize>
            Start Your Path to Mastery!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UniversityAction;
