import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./PrisonContent.module.scss";

const PrisonContent: React.FC = () => {
  const { title, description } = pageDescriptions.prison;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default PrisonContent;
