import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./HospitalContent.module.scss";

const HospitalContent: React.FC = () => {
  const pageData = pageDescriptions.hospital;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default HospitalContent;
