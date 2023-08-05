import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./BuildingsContent.module.scss";

const BuildingsContent: React.FC = () => {
  const pageData = pageDescriptions.buildings;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default BuildingsContent;
