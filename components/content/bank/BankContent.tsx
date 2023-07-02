import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import RequiredText from "@/components/ui/required/RequiredText";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import styles from "./BankContent.module.scss";

const BankContent: React.FC = () => {
  const pageData = pageDescriptions.bank;
  const { user, setUser } = useContext(UserContext);
  const [isStash, setIsStash] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingBank, setIsLoadingBank] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const userSavings = user && user.bank;

  const validationRules = {
    bankmoney: {
      required: "Please enter correct amount.",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter a valid number.",
      },
      min: {
        value: 0,
        message: "Please enter a positive number.",
      },
    },
  };

  function switchBankActionHandler() {
    setIsStash((prevState) => !prevState);
  }

  const onSubmit = async (data: any) => {
    const action = isStash ? "stash" : "withdraw";
    const requestData = {
      ...data,
      action: action,
    };

    try {
      setIsLoadingBank(true);
      const response = await fetch("/api/user/bankActions", {
        method: "POST",
        body: JSON.stringify({
          requestData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(response, setUser, setIsLoadingBank);
        reset();
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingBank
        );
      }
    } catch (error) {
      console.error("Error processing bank action.", error);
      setIsLoadingBank(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingBank && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <div className={styles.savings}>
        {userSavings ? (
          <h4>
            Your Current Savings: <span>${userSavings.toLocaleString()}</span>
          </h4>
        ) : (
          <h4>You don&apos;t have any funds in your bank account</h4>
        )}
      </div>
      <div className={styles.control}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
