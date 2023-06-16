import Collapsible from "@/components/ui/collapsible/Collapsible";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import faqData from "@/constants/faq";
import pageDescriptions from "@/constants/pagedescriptions";
import styles from "./HelpContent.module.scss";

const HelpContent: React.FC = () => {
  const { title, description } = pageDescriptions["help"];

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
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
