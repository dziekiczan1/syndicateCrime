import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { avatars } from "@/constants";
import Button from "../ui/button/Button";
import Avatar from "../user/avatar/Avatar";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignupFormInputs extends LoginFormInputs {
  username: string;
  avatar?: string;
}

type AuthFormInputs = LoginFormInputs & SignupFormInputs;

async function createUser(signupData: SignupFormInputs) {
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
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<AuthFormInputs>({ mode: "onChange" });

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAvatar(value);
    clearErrors("avatar");
  };

  useEffect(() => {
    setValue("avatar", selectedAvatar);
  }, [selectedAvatar, setValue]);

  async function onSubmit(data: LoginFormInputs | SignupFormInputs) {
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.error) {
        router.replace("/game");
      }
    } else {
      try {
        await createUser(data as SignupFormInputs);
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        router.replace("/game");
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
          <InputField
            label="Your Email"
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            register={register("email", { required: true })}
            error={errors.email && "This field is required"}
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
            error={errors.password && "This field is required"}
          />
        </div>
        {!isLogin && (
          <>
            <div className={styles.control}>
              <InputField
                label="Username"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                register={register("username", { required: true })}
                error={errors.username && "This field is required"}
              />
            </div>
            <div className={styles.control}>
              <InputField
                id="avatar"
                type="hidden"
                register={register("avatar", {
                  required: selectedAvatar ? false : true,
                })}
                error={errors.avatar && "This field is required"}
              />
              <div className={styles.avatars}>
                {avatars.map((avatar) => (
                  <div key={avatar.src} className={styles.avatar}>
                    <InputField
                      id={avatar.src}
                      type="radio"
                      name="avatar"
                      value={avatar.src}
                      onChange={handleAvatarChange}
                      checked={selectedAvatar === avatar.src}
                    >
                      <Avatar
                        src={avatar.src}
                        width={100}
                        height={100}
                        alt={avatar.src}
                      />
                    </InputField>
                  </div>
                ))}
              </div>
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
