import Link from "next/link";
import { ReactNode } from "react";

import styles from "./Button.module.scss";

export interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  link?: string;
  secondary?: boolean;
  form?: boolean;
  fullSize?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  secondary,
  link,
  form,
  fullSize,
  disabled,
  ...props
}) => {
  const className = `${styles.btn} ${secondary && styles.secondary} ${
    fullSize && styles.fullSize
  } ${disabled && styles.disabled}`;

  if (link) {
    return (
      <Link href={link} className={className} passHref>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={form ? "submit" : "button"}
      className={className}
      {...props}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
