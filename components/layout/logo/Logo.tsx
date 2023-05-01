import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/assets/logo/logo-desktop.png";
import styles from "./Logo.module.scss";

export interface ILogo {
  width: number;
  height: number;
  alt: string;
}

const Logo: React.FC<ILogo> = ({ width, height, alt }) => {
  return (
    <Link href="/">
      <Image
        src={logo}
        width={width}
        height={height}
        alt={alt}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
