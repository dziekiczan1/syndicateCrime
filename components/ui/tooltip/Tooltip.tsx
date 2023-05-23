import { ReactNode, useState } from "react";
import styles from "./Tooltip.module.scss";

export interface ITooltip {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<ITooltip> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
      {showTooltip && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;
