import gangImages from "@/constants/images/gang";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext } from "react";
import styles from "./SabotageModal.module.scss";

const SabotageModal = () => {
  const { user } = useContext(UserContext);
  const modalTitle = "You have been sabotaged!";
  const lastSabotage = user && user.sabotage?.lastLostSabotageDetails;

  return (
    <div className={styles.container}>
      <Image
        src={gangImages.sabotage}
        alt={modalTitle}
        width={640}
        height={360}
      />
      <div className={styles.mainContentWrapper}>
        <h3>
          You have been <span>sabotaged!</span>
        </h3>
        <div className={styles.sabotageTime}>
          <p>
            Date: <span>{lastSabotage?.date}</span>
          </p>
          <p>
            Attacker: <span>{lastSabotage?.attackedBy}</span>
          </p>
        </div>
        <p className={styles.sabotageText}>
          In a heated battle, the odds turned against you, resulting in a
          significant loss. You&apos;ve been caught in the crossfire, and
          unfortunately, it wasn&apos;t in your favor this time. It&apos;s a
          setback, but remember, every setback is a setup for a comeback. Stay
          vigilant and strategize for a triumphant return!
        </p>
        <div className={styles.sabotageDetails}>
          <p className="custom-label">You suffered a loss in battle:</p>
          <p>
            <span>Money:</span> ${lastSabotage?.lostMoney}
          </p>
          {lastSabotage?.lostResources[0] && (
            <p>
              <span>Resources:</span> {lastSabotage?.lostResources[0].count}{" "}
              {lastSabotage?.lostResources[0].resourceType}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SabotageModal;
