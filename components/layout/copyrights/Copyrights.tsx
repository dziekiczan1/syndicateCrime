import styles from "./Copyrights.module.scss";

const Copyrights: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p className={styles.copyrightsText}>
      © {currentYear} Syndicate Crime. All rights reserved.
    </p>
  );
};

export default Copyrights;
