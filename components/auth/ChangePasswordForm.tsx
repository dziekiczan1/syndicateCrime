import { useState } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../ui/button/Button";
import Loading from "../ui/loading/Loading";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";

export interface IChangePasswordFormInput {
  password: string;
  confirmPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState<string | null>(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordFormInput>();
  const router = useRouter();
  const { token } = router.query;

  const onSubmit = async (data: any) => {
    const { password, confirmPassword } = data;

    setIsInvalid(null);

    if (!password || !confirmPassword) {
      setIsInvalid("Password can't be empty field.");
      return;
    }

    if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
      setIsInvalid("Passwords must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setIsInvalid("Passwords do not match.");
      return;
    }

    setIsChangingPassword(true);

    const response = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ token, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (!response.ok && dataResponse) {
      setIsInvalid(dataResponse.message);
    } else if (response.ok) {
      setIsPasswordChanged(true);
    }

    setIsChangingPassword(false);
  };

  return (
    <section className={styles.auth}>
      {isChangingPassword ? (
        <div className={styles.loader}>
          <Loading />
        </div>
      ) : (
        <h1>Change Password</h1>
      )}
      {isInvalid && <p className={styles.message}>{isInvalid}</p>}
      {!isPasswordChanged ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.control}>
            <InputField
              label="New Password"
              id="password"
              type="password"
              name="password"
              placeholder="New Password"
              register={register("password", { required: true })}
              error={errors.password ? "This field is required" : undefined}
            />
            <InputField
              label="Confirm Password"
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              register={register("confirmPassword", {
                required: true,
              })}
              error={
                errors.confirmPassword ? "This field is required" : undefined
              }
            />
          </div>
          <div className={styles.actionsForgotEmail}>
            <Button form={true} secondary fullSize>
              Change Password
            </Button>
          </div>
        </form>
      ) : (
        <div className={styles.emailSentBox}>
          <p className={styles.emailSentMessage}>
            Your password has been successfully updated. Please go to the login
            page and use your new password to access your account.
          </p>
          <Button link="/" secondary>
            Go To Home Page
          </Button>
        </div>
      )}
    </section>
  );
};

export default ChangePasswordForm;
