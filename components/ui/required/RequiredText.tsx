import styles from "./RequiredText.module.scss";

export interface IRequiredText {
  text: string;
}

const RequiredText: React.FC<IRequiredText> = ({ text }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default RequiredText;
