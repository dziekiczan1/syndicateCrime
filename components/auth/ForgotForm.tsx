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
  const [isInvalid, setIsInvalid] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormInput>();

  const onSubmit = async (data: any) => {
    const { email } = data;

    console.log(data);

    setIsInvalid(null);
    setIsSendingEmail(true);

    const response = await fetch("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (!response.ok && dataResponse) {
      setIsInvalid(dataResponse.message);
    } else if (response.ok) {
      setIsEmailSent(true);
    }

    setIsSendingEmail(false);
  };

  return (
    <section className={styles.auth}>
      {isSendingEmail ? (
        <div className={styles.loader}>
          <Loading />
        </div>
      ) : (
        <h1>Forgot Password</h1>
      )}
      {isInvalid && <p className={styles.message}>{isInvalid}</p>}
      {!isEmailSent ? (
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
      ) : (
        <div className={styles.emailSentBox}>
          <p className={styles.emailSentMessage}>
            An email with a link to reset your password has been sent to your
            registered email address. Please check your email inbox, including
            the spam folder if it doesn&apos;t appear in your inbox. Follow the
            instructions in the email to reset your password.
          </p>
          <Button link="/" secondary>
            Go To Home Page
          </Button>
        </div>
      )}
    </section>
  );
};

export default ForgotForm;
