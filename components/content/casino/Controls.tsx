import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import Loading from "@/components/ui/loading/Loading";
import RequiredText from "@/components/ui/required/RequiredText";
import useCasinoActions from "@/lib/useCasinoActions";
import React, { useRef } from "react";
import { FieldError, FieldValues } from "react-hook-form";
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
  const messageRef = useRef<HTMLDivElement>(null);

  const {
    handleAction,
    register,
    handleSubmit,
    errors,
    validationRules,
    isLoading,
  } = useCasinoActions(messageRef);

  const onBetClick = async (data: FieldValues) => {
    try {
      const response = await handleAction(data.casinobet, "placeBet");

      if (response) {
        betEvent(Math.round(data.casinobet * 100) / 100);
      } else {
        console.error("Failed to place the bet:");
      }
    } catch (error) {
      console.error("An error occurred while placing the bet:", error);
    }
  };

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className={styles.controlsContainer}>
          <form onSubmit={handleSubmit(onBetClick)}>
            <p className={errors.casinobet && styles.message}>
              {errors.casinobet && (errors.casinobet as FieldError).message}
            </p>
            <InputField
              type="number"
              id="amount"
              name="amount"
              label="Amount"
              placeholder="Amount"
              register={register("casinobet", validationRules.casinobet)}
              required
            />
            <RequiredText text="Maximum bet is: $1.000,000" />
            {isLoading ? (
              <div className={styles.loading}>
                <Loading />
              </div>
            ) : (
              <Button form={true} secondary>
                Place Your Bet
              </Button>
            )}
          </form>
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
