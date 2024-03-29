import Card from "./Card";
import styles from "./Hand.module.scss";

type HandProps = {
  title: string;
  cards: any[];
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  const getTitle = () => {
    if (cards.length > 0) {
      return <h4 className={styles.title}>{title}</h4>;
    }
  };
  return (
    <div className={styles.handContainer}>
      {getTitle()}
      <div className={styles.cardContainer}>
        {cards.map((card: any, index: number) => {
          return (
            <Card
              key={index}
              value={card.value}
              suit={card.suit}
              hidden={card.hidden}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hand;
