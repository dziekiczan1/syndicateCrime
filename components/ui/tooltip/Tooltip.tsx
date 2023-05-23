import { ReactNode, useEffect, useState } from "react";
import styles from "./Tooltip.module.scss";

export interface ITooltip {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<ITooltip> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className={styles.tooltip}
          style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
        >
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
