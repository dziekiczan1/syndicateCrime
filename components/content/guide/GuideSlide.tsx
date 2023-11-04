import { IGuideContent } from "@/constants/guide/guide";
import Image from "next/image";
import styles from "./GuideModal.module.scss";

export interface IGuideSlideProps {
  guideChapter: IGuideContent;
}

const GuideSlide: React.FC<IGuideSlideProps> = ({ guideChapter }) => {
  return (
    <>
      <Image src={guideChapter.imageSrc} alt="guide" width={550} height={320} />
      <div className={styles.mainContentWrapper}>
        <h3>
          Guide: <span>{guideChapter.heading}</span>
        </h3>
        <div className={styles.sabotageTime}>
          <p>{guideChapter.description}</p>
        </div>
      </div>
    </>
  );
};

export default GuideSlide;
