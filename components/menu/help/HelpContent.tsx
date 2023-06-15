import Collapsible from "@/components/ui/collapsible/Collapsible";
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
        <Collapsible title="How can I increase my respect?">
          The easiest way to increase your respect is to do a lot of robberies.
          You can also increase your respect by assaulting other players.
        </Collapsible>
      </div>
    </div>
  );
};

export default HelpContent;
