import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import RequiredText from "@/components/ui/required/RequiredText";
import React, { useState } from "react";
import styles from "./Controls.module.scss";

type ControlsProps = {
  gameState: number;
  buttonState: any;
  betEvent: any;
  hitEvent: any;
  standEvent: any;
  resetEvent: any;
};

const Controls: React.FC<ControlsProps> = ({
  gameState,
  buttonState,
  betEvent,
  hitEvent,
  standEvent,
  resetEvent,
}) => {
  const [amount, setAmount] = useState(10);

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const onBetClick = () => {
    betEvent(Math.round(amount * 100) / 100);
  };

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className={styles.controlsContainer}>
          <InputField
            type="number"
            id="amount"
            name="amount"
            label="Amount"
            value={amount}
            onChange={amountChange}
            placeholder="Amount"
            required
          />
          <RequiredText text="Maximum bet is: $1.000,000" />
          <Button onClick={() => onBetClick()} secondary>
            Place Your Bet
          </Button>
        </div>
      );
    } else {
      return (
        <div className={styles.actionsContainer}>
          <Button
            onClick={() => hitEvent()}
            disabled={buttonState.hitDisabled}
            secondary
            fullSize
          >
            Hit
          </Button>
          <Button
            onClick={() => standEvent()}
            disabled={buttonState.standDisabled}
            secondary
            fullSize
          >
            Stand
          </Button>
          <Button
            onClick={() => resetEvent()}
            disabled={buttonState.resetDisabled}
            secondary
            fullSize
          >
            Reset
          </Button>
        </div>
      );
    }
  };

  return <>{getControls()}</>;
};

export default Controls;
