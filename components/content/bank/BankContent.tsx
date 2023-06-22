import InputField from "@/components/auth/InputField";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { FieldError, useForm } from "react-hook-form";
import styles from "./BankContent.module.scss";

const BankContent: React.FC = () => {
  const { title, description } = pageDescriptions.bank;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationRules = {
    bankmoney: {
      required: "Please enter the amount you want to stash.",
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

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
      <div className={styles.control}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Stash Your Savings"
            id="bankmoney"
            type="number"
            name="bankmoney"
            placeholder="Stash Your Savings"
            register={register("bankmoney", validationRules.bankmoney)}
          />
          {errors.bankmoney && (errors.bankmoney as FieldError).message}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BankContent;
