import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ISlideProps } from "@/constants/descriptions/sliderdata";
import { Icon, SliderNextIcon, SliderPrevIcon } from "../icons";
import styles from "./Slider.module.scss";

export interface ISliderProps {
  slides: ISlideProps[];
}

const Slider: React.FC<ISliderProps> = ({ slides }) => {
  console.log(slides);
  const [current, setCurrent] = useState(0);
  const length = slides?.length;

  const delay = 7000;
  const timeOutRef = useRef<any>();

  function resetTimeout() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeOutRef.current = setTimeout(
      () => setCurrent((current) => (current === length - 1 ? 0 : current + 1)),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (id: any) => {
    setCurrent(id);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div>No slides</div>;
  }

  return (
    <div className={styles.container}>
      {slides.map((slide, index) => {
        return (
          <div className={styles.imageWrapper} key={index}>
            {index === current && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className={styles.overlay}>
                  <div className={styles.titleWrapper}>
                    <h3 className="heading-white">{slide.title}</h3>
                  </div>
                </div>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={680}
                  height={360}
                  className={styles.image}
                />
              </motion.div>
            )}
          </div>
        );
      })}
      <div className={styles.prevSlide} onClick={prevSlide}>
        <Icon
          component={SliderPrevIcon}
          width={16}
          height={26}
          viewBox="8 13"
        />
      </div>
      <div className={styles.nextSlide} onClick={nextSlide}>
        <Icon
          component={SliderNextIcon}
          width={16}
          height={26}
          viewBox="8 13"
        />
      </div>
    </div>
  );
};

export default Slider;