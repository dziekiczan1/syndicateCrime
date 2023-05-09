import Image from "next/image";

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
    />
  );
};

export default Avatar;
