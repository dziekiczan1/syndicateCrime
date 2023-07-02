import { StaticImageData } from "next/image";

import loginBackground from "../public/assets/background/login.webp";
import logoDesktop from "../public/assets/logo/desktop.webp";

export interface IImages {
  [key: string]: StaticImageData;
}

const images: IImages = {
  loginBackground,
  logoDesktop,
};

export default images;
