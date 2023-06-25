import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import styles from "./BankContent.module.scss";

const BankContent: React.FC = () => {
  const { title, description } = pageDescriptions.bank;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isStash, setIsStash] = useState(true);

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
      const response = await fetch("/api/user/bankActions", {
        method: "POST",
        body: JSON.stringify({
          requestData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser);
      }
    } catch (error) {
      console.error("There was a problem.", error);
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
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
          />
          <div className={styles.actions}>
            <Button onClick={switchBankActionHandler}>
              {isStash ? "I want to stash" : "I want to withdraw"}
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
