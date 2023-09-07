import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./AlleyContent.module.scss";

const AlleyContent = () => {
  const pageData = pageDescriptions.alley;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default AlleyContent;
