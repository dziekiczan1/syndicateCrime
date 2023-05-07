import Image from "next/image";

import styles from "./Avatar.module.scss";

export interface IAvatarProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const Avatar: React.FC<IAvatarProps> = ({ src, width, height, alt }) => {
  return (
    <Image
      src={`/assets/avatars/${src}.webp`}
      width={width}
      height={height}
      alt={alt}
      className={styles.avatar}
    />
  );
};

export default Avatar;
