import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import Button from "../ui/button/Button";
import styles from "./AuthForm.module.scss";

export interface IUserSignupData {
  email?: string;
  password?: string;
}

async function createUser(signupData: IUserSignupData) {
  const { email, password } = signupData;

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
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
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result?.error) {
        router.replace("/uikit");
      }
    } else {
      try {
        const result = await createUser({
          email: enteredEmail,
          password: enteredPassword,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={styles.actions}>
          <Button form={true}>{isLogin ? "Login" : "Create Account"}</Button>
          <Button onClick={switchAuthModeHandler} form={true}>
            {isLogin ? "New user" : "Existing user"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
