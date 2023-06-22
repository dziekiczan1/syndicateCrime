import { ChangeEvent, ReactNode } from "react";

import { FieldError } from "react-hook-form";
import styles from "./AuthForm.module.scss";

export interface IInputProps {
  label?: string;
  id: string;
  type: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  checked?: boolean;
  error?: string | undefined | FieldError;
  children?: ReactNode;
  checkbox?: boolean;
}

const InputField: React.FC<IInputProps> = ({
  label,
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  register,
  checked,
  error,
  children,
  checkbox,
}) => {
  const inputProps = {
    type,
    id,
    name,
    value,
    placeholder,
    onChange,
    checked,
    ...register,
  };
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {type === "radio" ? (
          <>
            {checkbox && (
              <div className={styles.checkbox}>
                <span
                  className={`${styles.customCheckbox} ${
                    checked && styles.checked
                  }`}
                ></span>
                <span>{label}</span>
              </div>
            )}
            <input {...inputProps} className={styles.radio} />
            {children}
          </>
        ) : (
          <>
            {label}
            <input
              {...inputProps}
              className={styles.input}
              autoComplete="true"
            />
          </>
        )}
      </label>
      {error && (
        <p className={styles.message}>
          {typeof error === "object" ? error.message : error}
        </p>
      )}
    </>
  );
};

export default InputField;
