import Image from "next/image";
import styles from "./PageHeader.module.scss";

export interface IPageHeader {
  pageData: {
    title: string;
    description: string;
    image: any;
  };
}

const PageHeader: React.FC<IPageHeader> = ({ pageData }) => {
  const { title, description, image } = pageData;

  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt={title}
        width={680}
        height={360}
        className="sectionImage"
        priority={true}
      />
      <p className={styles.description}>{description}</p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default PageHeader;
