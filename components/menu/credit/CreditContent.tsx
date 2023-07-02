import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./CreditContent.module.scss";

const CreditContent: React.FC = () => {
  const pageData = pageDescriptions.credit;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default CreditContent;
