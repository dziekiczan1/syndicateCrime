import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./BlackmarketContent.module.scss";

const BlackmarketContent: React.FC = () => {
  const pageData = pageDescriptions.blackmarket;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};
export default BlackmarketContent;
