import Collapsible from "@/components/ui/collapsible/Collapsible";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import faqData from "@/constants/sections/faq";
import styles from "./HelpContent.module.scss";

const HelpContent: React.FC = () => {
  const pageData = pageDescriptions.help;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.faq}>
        {faqData.map((faq, idx) => (
          <Collapsible title={faq.question} key={idx}>
            {faq.answer}
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default HelpContent;
