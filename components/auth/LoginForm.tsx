import { FieldErrors, UseFormRegister } from "react-hook-form";

import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { ISignupFormInputs } from "./SignupForm";

export interface ILoginFormInputs {
  email: string;
  password: string;
}

export interface ILoginComponentProps {
  errors: FieldErrors<ISignupFormInputs>;
  register: UseFormRegister<ISignupFormInputs>;
}

const LoginForm: React.FC<ILoginComponentProps> = ({ errors, register }) => {
  return (
    <>
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
      <div className={styles.control}>
        <InputField
          label="Your Password"
          id="password"
          type="password"
          name="password"
          placeholder="Your Password"
          register={register("password", { required: true })}
          error={errors.password ? "This field is required" : undefined}
        />
      </div>
    </>
  );
};

export default LoginForm;
