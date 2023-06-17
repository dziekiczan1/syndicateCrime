import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./SabotageContent.module.scss";

const SabotageContent: React.FC = () => {
  const { title, description } = pageDescriptions.sabotage;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default SabotageContent;