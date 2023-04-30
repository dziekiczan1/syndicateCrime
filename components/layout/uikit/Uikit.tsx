import styles from "./Uikit.module.scss";

const UiKit: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.colors}>
        <h1>Color Variables</h1>
        <p>$color-base-light: #f5f5f5</p>
        <p>$color-base-dark: #333333</p>
        <p>$color-base-red: #990000</p>
        <p>$color-base-gold: #ffd700</p>
        <p>$color-base-orange: #ffa500</p>
      </div>
    </div>
  );
};

export default UiKit;
