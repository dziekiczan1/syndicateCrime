import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./UniversityContent.module.scss";

const UniversityContent: React.FC = () => {
  const pageData = pageDescriptions.university;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default UniversityContent;
