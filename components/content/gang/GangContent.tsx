import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./GangContent.module.scss";

const GangContent: React.FC = () => {
  const pageData = pageDescriptions.gang;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default GangContent;
