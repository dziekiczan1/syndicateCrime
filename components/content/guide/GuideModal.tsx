import gangImages from "@/constants/images/gang";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext, useState } from "react";
import styles from "./GuideModal.module.scss";

const GuideModal = () => {
  const { user } = useContext(UserContext);
  const [guideComponent, setGuideComponent] = useState(1);

  const handleNextClick = () => {
    setGuideComponent((prevGuideComponent) => prevGuideComponent + 1);
  };

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
      <div>
        {guideComponent === 1 && <p>first guide</p>}
        {guideComponent === 2 && <p>second guide</p>}
        {guideComponent === 3 && <p>third guide</p>}
        {guideComponent < 3 && <button onClick={handleNextClick}>Next</button>}
      </div>
    </div>
  );
};

export default GuideModal;
