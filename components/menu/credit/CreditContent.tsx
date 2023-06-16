import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./CreditContent.module.scss";

const CreditContent: React.FC = () => {
  const { title, description } = pageDescriptions.credit;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default CreditContent;
