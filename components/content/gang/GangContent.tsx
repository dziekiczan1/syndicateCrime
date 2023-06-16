import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./GangContent.module.scss";

const GangContent: React.FC = () => {
  const { title, description } = pageDescriptions.gang;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default GangContent;
