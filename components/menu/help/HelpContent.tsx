import Collapsible from "@/components/ui/collapsible/Collapsible";
import faqData from "@/constants/faq";
import styles from "./HelpContent.module.scss";

const HelpContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Embark on a quest to unlock the secrets of your favorite app and
          uncover the hidden treasures of knowledge. Discover valuable insights,
          expert tips, and step-by-step guidance that will empower you on your
          journey towards mastery. From conquering challenges to unleashing your
          full potential, dive into a world of limitless possibilities. Are you
          prepared to embark on this adventure and become a true champion?
        </p>
      </div>
      <h2 className={styles.title}>Help: Your Ultimate Guide to Mastery</h2>
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
