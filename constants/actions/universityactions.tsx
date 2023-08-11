import { StaticImageData } from "next/image";
import universityImages from "../images/university";

export interface IUniversityActions {
  name: string;
  title: string;
  imageSrc: StaticImageData;
  description: string;
  cost: number;
}

export const universityActions: IUniversityActions[] = [
  {
    name: "pimp",
    title: "Pimping Mastery: Expand Your Empire of Influence",
    imageSrc: universityImages.pimp,
    description:
      "Step into the captivating world of strategic pimping mastery and elevate your empire of influence. Uncover the art of managing and expanding your network of professionals while optimizing your workforce. Dive into insightful lessons on recruitment, leadership, and resource allocation, equipping you with the skills to effectively lead and grow your team of whores. Learn to navigate the complexities of the industry, make calculated decisions, and solidify your status as a master in the realm of strategic pimping. Are you ready to harness your potential and shape a thriving empire?",
    cost: 100000,
  },
];
