import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import RequiredText from "@/components/ui/required/RequiredText";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useBankActions from "@/lib/useBankActions";
import UserContext from "@/store/user-context";
import { useContext, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import styles from "./BankContent.module.scss";

const BankContent: React.FC = () => {
  const pageData = pageDescriptions.bank;
  const { user } = useContext(UserContext);
  const [isStash, setIsStash] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);

  const {
    errorMessage,
    actionMessage,
    isLoading,
    handleAction,
    register,
    handleSubmit,
    errors,
    validationRules,
  } = useBankActions(messageRef);

  const switchBankActionHandler = () => {
    setIsStash((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
      <div className={styles.savings}>
        {user?.bank ? (
          <h4>
            Your Current Savings: <span>${user.bank.toLocaleString()}</span>
          </h4>
        ) : (
          <h4>You don&apos;t have any funds in your bank account</h4>
        )}
        <p className={styles.maxLimit}>
          Your current maximum limit for stashed money is:{" "}
          <span>
            {user?.university && user.university.bank
              ? "Unlimited"
              : "$100,000"}
          </span>
        </p>
      </div>
      <div className={styles.control}>
        <form onSubmit={handleSubmit((data) => handleAction(data, isStash))}>
          <p className={errors.bankmoney && styles.message}>
            {errors.bankmoney && (errors.bankmoney as FieldError).message}
          </p>
          <InputField
            label={isStash ? "Stash Your Savings" : "Withdraw Your Savings"}
            id="bankmoney"
            type="number"
            name="bankmoney"
            placeholder={
              isStash ? "Stash Your Savings" : "Withdraw Your Savings"
            }
            register={register("bankmoney", validationRules.bankmoney)}
            required
          />
          <RequiredText text="Please note that each transaction incurs an energy cost of 2%" />
          <div className={styles.actions}>
            <Button onClick={switchBankActionHandler}>
              {isStash ? "I want to withdraw" : "I want to stash"}
            </Button>
            <Button form={true} secondary>
              {isStash ? "Stash your money!" : "Withdraw your money!"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankContent;
