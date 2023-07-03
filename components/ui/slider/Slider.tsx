import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Icon, SliderNextIcon, SliderPrevIcon } from "../icons";
import styles from "./Slider.module.scss";

export interface ISliderProps {
  slides: any;
}

const Slider: React.FC<ISliderProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

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
                {/* <div className="flex justify-center">
                  <div className="z-10 absolute h-[400px] md:h-[500px] md:justify-start md:top-1/5 flex flex-col justify-center items-center gap-y-4 md:gap-y-8 w-[265px] md:w-[490px] text-center">
                    <h1 className="heading-white">{slide.title}</h1>
                  </div>
                </div> */}
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
        />{" "}
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
