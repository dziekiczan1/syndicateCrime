import Button from "@/components/ui/button/Button";
import mainNews from "@/constants/game";
import Image from "next/image";
import styles from "./GameContent.module.scss";

const GameContent: React.FC = () => {
  return (
    <section className={styles.container}>
      {mainNews.map((newsItem, index) => (
        <div key={index}>
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            width={640}
            height={360}
            className={styles.image}
          />
          <div className={styles.header}>
            <h2>{newsItem.title}</h2>
            <p>{newsItem.date}</p>
          </div>
          <div className={styles.content}>
            <h3 className={styles.subtitle}>{newsItem.subtitle}</h3>
            {newsItem.paragraphs.map((paragraph, idx) => (
              <p className={styles.description} key={idx}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.actions}>
            <Button link={newsItem.link} secondary>
              {newsItem.button}
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GameContent;
