import { ReactNode } from "react";
import { CloseMobileIcon, Icon } from "../icons";
import styles from "./Modal.module.scss";

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<IModal> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div onClick={onClose} className={styles.mobileClose}>
          <Icon
            component={CloseMobileIcon}
            width={36}
            height={36}
            viewBox="24 24"
          />
        </div>
        <div className={`modal-content ${styles.content}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
