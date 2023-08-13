import { motion } from "framer-motion";
import styles from "./Message.module.scss";

export interface IMessage {
  message: string;
}

const Message: React.FC<IMessage> = ({ message }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <p>{message}</p>
    </motion.div>
  );
};

export default Message;
