import gangImages from "@/constants/images/gang";
import Image from "next/image";
import styles from "./GuideModal.module.scss";

const FirstSlide = () => {
  return (
    <>
      <Image src={gangImages.sabotage} alt="guide" width={640} height={360} />
      <div className={styles.mainContentWrapper}>
        <h3>
          You have been <span>guided!</span>
        </h3>
        <div className={styles.sabotageTime}>
          <p>Guide</p>
        </div>
      </div>
    </>
  );
};

export default FirstSlide;
