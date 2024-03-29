import { ReactNode } from "react";
import Button from "../button/Button";
import { CloseMobileIcon, Icon } from "../icons";
import styles from "./Modal.module.scss";

export interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  closeAble?: boolean;
}

const Modal: React.FC<IModal> = ({ isOpen, onClose, children, closeAble }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {closeAble && (
          <div onClick={onClose} className={styles.mobileClose}>
            <Icon
              component={CloseMobileIcon}
              width={36}
              height={36}
              viewBox="24 24"
            />
          </div>
        )}
        <div className={`modal-content ${styles.content}`}>{children}</div>
        {closeAble && (
          <Button onClick={onClose} fullSize secondary>
            Got it!
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
