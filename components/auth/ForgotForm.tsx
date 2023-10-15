import { useRouter } from "next/router";
import { useState } from "react";

import { useForm } from "react-hook-form";
import Button from "../ui/button/Button";
import Loading from "../ui/loading/Loading";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";

export interface IForgotPasswordFormInput {
  email: string;
}

const ForgotForm: React.FC = () => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormInput>();

  const router = useRouter();
  const onSubmit = (data: any) => {};

  return (
    <section className={styles.auth}>
      {isSendingEmail ? (
        <div className={styles.loader}>
          <Loading />
        </div>
      ) : (
        <h1>Forgot Password</h1>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.control}>
          <InputField
            label="Your Email"
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            register={register("email", { required: true })}
            error={errors.email ? "This field is required" : undefined}
          />
        </div>
        <div className={styles.actionsForgotEmail}>
          <Button form={true} secondary fullSize>
            Send Reset Password E-mail
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ForgotForm;
