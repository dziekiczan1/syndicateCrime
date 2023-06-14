import { useState } from "react";

import styles from "./Collapsible.module.scss";

export interface ICollapsible {
  open?: boolean;
  children: any;
  title: string;
}

const Collapsible: React.FC<ICollapsible> = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className="p-3 border-bottom d-flex justify-content-between">
          <h6 className="font-weight-bold">{title}</h6>
          <div onClick={handleFilterOpening}>
            {!isOpen ? <p>icon down</p> : <p>icon up</p>}
          </div>
        </div>
      </div>

      <div className="border-bottom">
        <div>{isOpen && <div className="p-3">{children}</div>}</div>
      </div>
    </div>
  );
};

export default Collapsible;
