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
      <h2>{modalTitle}</h2>
      <h3>
        by user <span>{lastSabotage?.attackedBy}</span>
      </h3>
    </div>
  );
};

export default SabotageModal;
