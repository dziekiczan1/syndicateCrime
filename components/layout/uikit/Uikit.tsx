import styles from "./Uikit.module.scss";

const UiKit: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Color Variables</h1>
      <p>$dark-gray: #333333</p>
      <p>$dark-red: #990000</p>
      <p>$base-gold: #ffd700</p>
      <p>$base-orange: #ffa500</p>
    </div>
  );
};

export default UiKit;
