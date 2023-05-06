import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants";
import styles from "./Logo.module.scss";

export interface ILogoProps {
  width: number;
  height: number;
  alt: string;
}

const Logo: React.FC<ILogoProps> = ({ width, height, alt }) => {
  return (
    <Link href="/">
      <Image
        src={images.logoDesktop}
        width={width}
        height={height}
        alt={alt}
        className={styles.logo}
        unoptimized={true}
      />
    </Link>
  );
};

export default Logo;
