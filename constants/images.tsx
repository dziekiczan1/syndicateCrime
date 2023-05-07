import { StaticImageData } from "next/image";

import loginBackground from "../public/assets/background/login.webp";
import logoDesktop from "../public/assets/logo/desktop.webp";

import avatar1 from "../public/assets/avatars/av1.webp";
import avatar2 from "../public/assets/avatars/av2.webp";
import avatar3 from "../public/assets/avatars/av3.webp";
import avatar4 from "../public/assets/avatars/av4.webp";
import avatar5 from "../public/assets/avatars/av5.webp";
import avatar6 from "../public/assets/avatars/av6.webp";

export interface IImages {
  [key: string]: StaticImageData;
}

const images: IImages = {
  loginBackground,
  logoDesktop,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
};

export default images;
