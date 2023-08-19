import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./SabotageContent.module.scss";

const SabotageContent: React.FC = () => {
  const pageData = pageDescriptions.sabotage;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default SabotageContent;
