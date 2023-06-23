import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./HospitalContent.module.scss";

const HospitalContent: React.FC = () => {
  const { title, description } = pageDescriptions.hospital;

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
    </div>
  );
};

export default HospitalContent;
