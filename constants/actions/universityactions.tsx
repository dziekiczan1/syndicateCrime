import { StaticImageData } from "next/image";
import universityImages from "../images/university";

export interface IUniversityActions {
  name: string;
  title: string;
  imageSrc: StaticImageData;
  description: string;
  cost: number;
  reqRespect: number;
  reqName: string;
  reqValue: number;
  bonus: string;
}

export const universityActions: IUniversityActions[] = [
  {
    name: "architecture",
    title: "Architectural Dominion: Build Your Skyscraper Legacy",
    imageSrc: universityImages.architecture,
    description:
      "Immerse yourself in the world of Architectural Dominion and unlock the prowess to build an enduring legacy of towering structures. Discover the art of urban development as you learn to strategize, design, and construct awe-inspiring buildings that shape skylines. Delve into comprehensive lessons covering blueprint mastery, materials selection, and advanced construction techniques. Navigate through city planning intricacies and seize opportunities to amass a portfolio of iconic real estate. Harness your creative vision, make informed decisions, and establish yourself as a virtuoso in the realm of architectural domination. Are you prepared to construct a cityscape that stands as a testament to your ingenuity?",
    cost: 250000,
    reqRespect: 1000,
    reqName: "Intelligence",

    reqValue: 1500,
    bonus: "Increases your maximum limit for buildings up to 8.",
  },
  {
    name: "blackmarket",
    title: "Underworld Arms Mastery: Forge Your Arsenal",
    imageSrc: universityImages.blackmarket,
    description:
      "Embark on a journey into the realm of Underworld Arms Mastery and seize control over a potent arsenal that defines your influence. Unveil the secrets of sourcing, trading, and maximizing the potential of forbidden weaponry in the clandestine world of the black market. Engage in immersive lessons that delve into weapon selection, procurement strategies, and discreet transactions. Navigate through the shadows, grasp the dynamics of risk and reward, and enhance your mastery over an array of powerful arms. Are you ready to shape your reputation as a weapons maestro and wield an arsenal that empowers your reign?",
    cost: 250000,
    reqRespect: 1000,
    reqName: "Strength",
    reqValue: 1500,
    bonus: "Increases your maximum limit for weapons up to 10.",
  },
  {
    name: "pimp",
    title: "Pimping Mastery: Expand Your Empire of Influence",
    imageSrc: universityImages.pimp,
    description:
      "Step into the captivating world of strategic pimping mastery and elevate your empire of influence. Uncover the art of managing and expanding your network of professionals while optimizing your workforce. Dive into insightful lessons on recruitment, leadership, and resource allocation, equipping you with the skills to effectively lead and grow your team of whores. Learn to navigate the complexities of the industry, make calculated decisions, and solidify your status as a master in the realm of strategic pimping. Are you ready to harness your potential and shape a thriving empire?",
    cost: 250000,
    reqRespect: 1000,
    reqName: "Charisma",
    reqValue: 1500,
    bonus: "Increases your maximum limit for whores up to 10.",
  },
  {
    name: "bank",
    title: "Financial Fortification: Master the Vaulted Strategies",
    imageSrc: universityImages.bank,
    description:
      "Embark on a transformative journey into the realm of Financial Fortification and wield the knowledge to maximize the potential of secure banking. Uncover the art of strategic wealth management, capital preservation, and discreet financial maneuvers within the modern banking landscape. Dive into immersive lessons that explore savings, investments, and personalized financial strategies tailored to your goals. Navigate through the intricate world of fiscal responsibility, optimize your assets, and establish a legacy of financial success. Are you prepared to command your wealth with precision and elevate your stature as a master of monetary acumen?",
    cost: 250000,
    reqRespect: 1000,
    reqName: "Endurance",
    reqValue: 1500,
    bonus: "Increases your maximum limit for stash to unlimited.",
  },
];
