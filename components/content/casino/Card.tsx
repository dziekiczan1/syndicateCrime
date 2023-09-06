import React from "react";
import styles from "./Card.module.scss";

type CardProps = {
  value: string;
  suit: string;
  hidden: boolean;
};

const Card: React.FC<CardProps> = ({ value, suit, hidden }) => {
  const getColor = () => {
    if (suit === "♠" || suit === "♣") {
      return styles.black;
    } else {
      return styles.red;
    }
  };

  const getCard = () => {
    if (hidden) {
      return <div className={styles.hiddenCard} />;
    } else {
      return (
        <div className={styles.card}>
          <div className={getColor()}>
            <h3 className={styles.value}>{value}</h3>
            <h3 className={styles.suit}>{suit}</h3>
          </div>
        </div>
      );
    }
  };

  return <>{getCard()}</>;
};

export default Card;
