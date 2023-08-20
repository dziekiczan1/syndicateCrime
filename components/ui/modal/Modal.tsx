import Image from "next/image";
import { CloseMobileIcon, Icon } from "../icons";
import styles from "./Modal.module.scss";

export interface IModal {
  isOpen: any;
  onClose: any;
  image?: any;
  title?: any;
  details?: any;
}

const Modal: React.FC<IModal> = ({
  isOpen,
  onClose,
  image,
  title,
  details,
}) => {
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
        <Image
          src={image}
          alt={title}
          width={640}
          height={360}
          className={styles.image}
        />
        <div className={`modal-content ${styles.content}`}>
          <h2>{title}</h2>
          {details.attackedBy && (
            <h3>
              by user <span>{details.attackedBy}</span>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
