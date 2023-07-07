import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./WhoresContent.module.scss";

const WhoresContent: React.FC = () => {
  const pageData = pageDescriptions.whores;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};
export default WhoresContent;
