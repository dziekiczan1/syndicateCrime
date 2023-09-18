import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./DistrictContent.module.scss";

const DistrictContent = () => {
  const pageData = pageDescriptions.districts;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};

export default DistrictContent;
