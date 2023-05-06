import Link from "next/link";
import { ReactNode } from "react";

import styles from "./Button.module.scss";

export interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  link?: string;
  secondary?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  secondary,
  link,
  ...props
}) => {
  const className = `${styles.btn} ${secondary && styles.secondary}`;

  if (link) {
    return (
      <Link href={link} passHref>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
