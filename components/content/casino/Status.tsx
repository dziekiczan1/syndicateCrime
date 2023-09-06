import React from "react";
import { Message } from "./CasinoContent";
import styles from "./Status.module.scss";

type StatusProps = {
  message: string;
  balance: number;
};

const Status: React.FC<StatusProps> = ({ message, balance }) => {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <h3 className={styles.value}>{message}</h3>
      </div>
      <div className={styles.balance}>
        <h4>
          {message === Message.dealerWin
            ? "You lost: "
            : message === Message.userWin
            ? "Your Won: "
            : "Your Bet: "}
          <span>${balance.toLocaleString()}</span>
        </h4>
      </div>
    </div>
  );
};

export default Status;
