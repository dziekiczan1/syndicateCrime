import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
        <svg
          width="16"
          height="26"
          viewBox="0 0 8 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.20711 0.792891C7.59763 1.18342 7.59763 1.81658 7.20711 2.20711L2.91418 6.50001L7.20711 10.7929C7.59763 11.1834 7.59763 11.8166 7.20711 12.2071C6.81658 12.5976 6.1834 12.5976 5.79289 12.2071L0.792876 7.20711C0.402375 6.81661 0.402375 6.18341 0.792876 5.79291L5.79289 0.792891C6.1834 0.40237 6.81658 0.40237 7.20711 0.792891Z" />
        </svg>
      </div>
      <div className={styles.nextSlide} onClick={nextSlide}>
        <svg
          width="16"
          height="26"
          viewBox="0 0 8 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.792891 0.792891C0.40237 1.18342 0.40237 1.81658 0.792891 2.20711L5.08582 6.50001L0.792891 10.7929C0.40237 11.1834 0.40237 11.8166 0.792891 12.2071C1.18342 12.5976 1.8166 12.5976 2.20711 12.2071L7.20712 7.20711C7.59763 6.81661 7.59763 6.18341 7.20712 5.79291L2.20711 0.792891C1.8166 0.40237 1.18342 0.40237 0.792891 0.792891Z" />
        </svg>
      </div>
    </div>
  );
};

export default Slider;
