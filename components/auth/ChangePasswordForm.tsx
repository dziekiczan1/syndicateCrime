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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordFormInput>();
  const router = useRouter();
  const { token } = router.query;

  const onSubmit = async (data: any) => {
    const { password, confirmPassword } = data;

    setIsChangingPassword(true);

    const response = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ token, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    </section>
  );
};

export default ChangePasswordForm;
