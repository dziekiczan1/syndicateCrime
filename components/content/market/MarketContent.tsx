import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./MarketContent.module.scss";

const MarketContent: React.FC = () => {
  const pageData = pageDescriptions.market;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
    </div>
  );
};
export default MarketContent;
