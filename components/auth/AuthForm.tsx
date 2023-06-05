import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import UserContext from "@/store/user-context";
import Button from "../ui/button/Button";
import Loading from "../ui/loading/Loading";
import styles from "./AuthForm.module.scss";
import LoginForm, { ILoginFormInputs } from "./LoginForm";
import SignupForm, { ISignupFormInputs } from "./SignupForm";

type AuthFormInputs = ILoginFormInputs & ISignupFormInputs;

async function createUser(signupData: ISignupFormInputs) {
  const { email, password, username, avatar } = signupData;

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username, avatar }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isInvalid, setIsInvalid] = useState<string | null>(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);

  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<AuthFormInputs>({ mode: "onChange" });

  const { setUser } = useContext(UserContext);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmit(data: ILoginFormInputs | ISignupFormInputs) {
    if (isLogin) {
      setIsLoadingLogin(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        setIsInvalid(result.error);
      }
      if (!result?.error) {
        const response = await fetch("/api/user/getUser");
        const userData = await response.json();
        if (setUser) {
          setUser(userData);
        }
        router.replace("/game");
      }
      setIsLoadingLogin(false);
    } else {
      setIsLoadingSignup(true);
      try {
        await createUser(data as ISignupFormInputs);
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        const response = await fetch("/api/user/getUser");
        const userData = await response.json();
        if (setUser) {
          setUser(userData);
        }
        router.replace("/game");
      } catch (error) {
        setIsInvalid((error as Error).message);
      }
      setIsLoadingSignup(false);
    }
  }

  return (
    <section className={styles.auth}>
      {isLoadingLogin || isLoadingSignup ? (
        <div className={styles.loader}>
          <Loading />
        </div>
      ) : (
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      )}
      {isInvalid && <p className={styles.message}>{isInvalid}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <LoginForm register={register} errors={errors} />
        {!isLogin && (
          <SignupForm
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}
        <div className={styles.actions}>
          <Button form={true}>{isLogin ? "Login" : "Create Account"}</Button>
          <Button onClick={switchAuthModeHandler}>
            {isLogin ? "New user" : "Existing user"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
