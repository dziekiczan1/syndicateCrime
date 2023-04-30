import styles from "./Uikit.module.scss";

const UiKit: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.colors}>
        <h1 className={styles.heading}>Color Variables</h1>
        <p>$color-base-light: #f5f5f5</p>
        <p>$color-base-dark: #333333</p>
        <p>$color-base-red: #990000</p>
        <p>$color-base-gold: #ffd700</p>
        <p>$color-base-orange: #ffa500</p>
      </div>
      <div className={styles.headings}>
        <h1 className={styles.heading}>Typography</h1>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Paragraph</p>
      </div>
    </div>
  );
};

export default UiKit;
