import styles from "./AuthForm.module.scss";
import InputField from "./InputField";

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginComponentProps {
  errors: Record<string, unknown>;
  register?: any;
}

const LoginForm: React.FC<LoginComponentProps> = ({ errors, register }) => {
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
