import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./NightclubContent.module.scss";

const NightclubContent: React.FC = () => {
  const pageData = pageDescriptions.nightclub;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default NightclubContent;
