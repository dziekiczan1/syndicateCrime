import gangImages from "@/constants/images/gang";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext } from "react";
import styles from "./GuideModal.module.scss";

const GuideModal = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Image src={gangImages.sabotage} alt="guide" width={640} height={360} />
      <div className={styles.mainContentWrapper}>
        <h3>
          You have been <span>guided!</span>
        </h3>
        <div className={styles.sabotageTime}>
          <p>Guide</p>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
