import styles from "./PageHeader.module.scss";

export interface IPageHeader {
  title: string;
  description: string;
}

const PageHeader: React.FC<IPageHeader> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>{description}</p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default PageHeader;
