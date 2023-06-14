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
      <div>
        <div className="p-3 border-bottom d-flex justify-content-between">
          <h6 className="font-weight-bold">{title}</h6>
          <div onClick={handleFilterOpening} className={styles.icon}>
            {!isOpen ? (
              <Icon
                component={ArrowDownIcon}
                width={24}
                height={24}
                viewBox="20 20"
              />
            ) : (
              <Icon
                component={ArrowUpIcon}
                width={24}
                height={24}
                viewBox="20 20"
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.answer} style={{ height }}>
        <div ref={ref}>{isOpen && <div className="p-3">{children}</div>}</div>
      </div>
    </div>
  );
};

export default Collapsible;
