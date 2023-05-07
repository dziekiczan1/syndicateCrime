import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { avatars } from "@/constants";
import Button from "../ui/button/Button";
import Avatar from "../user/avatar/Avatar";
import styles from "./AuthForm.module.scss";

type LoginFormInputs = {
  email: string;
  password: string;
};

type SignupFormInputs = {
  email: string;
  password: string;
  username: string;
  avatar: string;
};

type AuthFormInputs = LoginFormInputs & SignupFormInputs;

async function createUser(signupData: SignupFormInputs) {
  const { email, password, username } = signupData;

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
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
  console.log(avatars);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmit(data: LoginFormInputs | SignupFormInputs) {
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.error) {
        router.replace("/uikit");
      }
    } else {
      try {
        const result = await createUser(data as SignupFormInputs);
        console.log(result);
      } catch (error) {
        setIsInvalid((error as Error).message);
      }
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {isInvalid && <p className={styles.message}>{isInvalid}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className={styles.message}>This field is required</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className={styles.message}>This field is required</p>
          )}
        </div>
        {!isLogin && (
          <>
            <div className={styles.control}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className={styles.message}>This field is required</p>
              )}
            </div>
            <div className={styles.control}>
              <label htmlFor="username">Your Avatar</label>
              <input
                type="hidden"
                id="avatar"
                {...register("avatar", { required: true })}
              />
              <div className={styles.avatars}>
                {avatars.map((avatar) => (
                  <div key={avatar.src}>
                    <Avatar
                      src={avatar.src}
                      width={100}
                      height={100}
                      alt={avatar.src}
                    />
                  </div>
                ))}
              </div>
              {errors.username && (
                <p className={styles.message}>This field is required</p>
              )}
            </div>
          </>
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
