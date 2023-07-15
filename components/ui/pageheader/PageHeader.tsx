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
      <div className={styles.imageWrapper}>
        <div>
          <div className={styles.overlay}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{title}</h2>
            </div>
          </div>
          <Image
            src={image}
            alt={title}
            width={680}
            height={360}
            className="sectionImage"
            priority={true}
          />
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default PageHeader;
