import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./NightclubContent.module.scss";

const NightclubContent: React.FC = () => {
  const { title, description } = pageDescriptions.nightclub;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default NightclubContent;
