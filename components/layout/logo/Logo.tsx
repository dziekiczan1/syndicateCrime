import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants";
import styles from "./Logo.module.scss";

export interface ILogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<ILogoProps> = ({ width, height }) => {
  return (
    <Link href="/">
      <Image
        src={images.logoDesktop}
        width={width}
        height={height}
        alt="Syndicate Crime"
        className={styles.logo}
        placeholder="blur"
        priority={true}
      />
    </Link>
  );
};

export default Logo;
