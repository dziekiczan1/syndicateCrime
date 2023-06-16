import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./DealerContent.module.scss";

const DealerContent: React.FC = () => {
  const { title, description } = pageDescriptions.dealer;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default DealerContent;
