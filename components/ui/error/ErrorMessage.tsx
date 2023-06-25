import { motion } from "framer-motion";
import styles from "./ErrorMessage.module.scss";

export interface IErrorMessage {
  errorMessage: string;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <p>{errorMessage}</p>
    </motion.div>
  );
};

export default ErrorMessage;
