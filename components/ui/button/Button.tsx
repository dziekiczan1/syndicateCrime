import Link from "next/link";
import { ReactNode } from "react";

import styles from "./Button.module.scss";

export interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  link?: string;
  secondary?: boolean;
  form?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  secondary,
  link,
  form,
  ...props
}) => {
  const className = `${styles.btn} ${secondary && styles.secondary}`;

  if (link) {
    return (
      <Link href={link} className={className} passHref>
        {children}
      </Link>
    );
  }

  return (
    <button type={form ? "submit" : "button"} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
