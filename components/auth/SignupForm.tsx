import { ChangeEvent, useEffect, useState } from "react";

import { avatars } from "@/constants";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Avatar from "../user/avatar/Avatar";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { ILoginFormInputs } from "./LoginForm";

export interface ISignupFormInputs extends ILoginFormInputs {
  username: string;
  avatar: string;
}

export interface ISignupFormComponentProps {
  errors: FieldErrors<ISignupFormInputs>;
  register: UseFormRegister<ISignupFormInputs>;
  clearErrors: UseFormClearErrors<ISignupFormInputs>;
  setValue: UseFormSetValue<ISignupFormInputs>;
}

const SignupForm: React.FC<ISignupFormComponentProps> = ({
  errors,
  register,
  clearErrors,
  setValue,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAvatar(value);
    clearErrors("avatar");
  };

  useEffect(() => {
    setValue("avatar", selectedAvatar);
  }, [selectedAvatar, setValue]);

  return (
    <>
      <div className={styles.control}>
        <InputField
          label="Username"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          register={register("username", { required: true })}
          error={errors.username ? "This field is required" : undefined}
        />
      </div>
      <div className={styles.control}>
        <InputField
          id="avatar"
          type="hidden"
          register={register("avatar", {
            required: selectedAvatar ? false : true,
          })}
          error={errors.avatar ? "This field is required" : undefined}
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
  );
};

export default SignupForm;
