import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <ul className={styles.section}>
          <h4 className={styles.sectionTitle}>Title</h4>
          <li>Some Link</li>
        </ul>
        <ul className={styles.section}>
          <h4 className={styles.sectionTitle}>Title</h4>
          <li>Some Link</li>
        </ul>
        <ul className={styles.section}>
          <h4 className={styles.sectionTitle}>Title</h4>
          <li>Some Link</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
