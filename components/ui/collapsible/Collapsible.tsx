import { useEffect, useRef, useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "@/components/ui/icons";
import Icon from "@/components/ui/icons/Icon";
import styles from "./Collapsible.module.scss";

export interface ICollapsible {
  open?: boolean;
  children: any;
  title: string;
}

const Collapsible: React.FC<ICollapsible> = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0
  );
  const ref = useRef<HTMLDivElement>(null);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.heading} onClick={handleFilterOpening}>
        <p className={`${styles.question} ${isOpen && styles.active}`}>
          {title}
        </p>
        <div className={styles.icon}>
          {!isOpen ? (
            <Icon
              component={ArrowDownIcon}
              width={20}
              height={20}
              viewBox="24 24"
            />
          ) : (
            <Icon
              component={ArrowUpIcon}
              width={20}
              height={20}
              viewBox="24 24"
            />
          )}
        </div>
      </div>
      <div className={styles.answer} style={{ height }}>
        <div ref={ref} className={styles.answerContainer}>
          {isOpen && <p>{children}</p>}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
