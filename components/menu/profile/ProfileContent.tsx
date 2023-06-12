import styles from "./ProfileContent.module.scss";

const BaseTemplate: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Explore the profile of an accomplished player and dive into their
          gaming journey. Gain insights into their achievements, stats, and
          progress as they conquer challenges and make their mark in the gaming
          world. From epic victories to strategic triumphs, follow their path to
          greatness. Are you ready to delve into the realm of gaming excellence
          and discover what it takes to become a legend?
        </p>
      </div>
      <h2 className={styles.title}>Player Profile: A Journey of Success</h2>
    </div>
  );
};

export default BaseTemplate;
