import guideImages from "@/constants/images/guide";
import Image from "next/image";
import styles from "./GuideModal.module.scss";

const SecondSlide = () => {
  return (
    <>
      <Image src={guideImages.userstats} alt="guide" width={550} height={320} />
      <div className={styles.mainContentWrapper}>
        <h3>
          Guide: <span>Chapter Two!</span>
        </h3>
        <div className={styles.sabotageTime}>
          <p>Guide</p>
        </div>
      </div>
    </>
  );
};

export default SecondSlide;
