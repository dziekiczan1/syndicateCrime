import { StaticImageData } from "next/image";
import guideImages from "../images/guide";

export interface IGuideContent {
  heading: string;
  imageSrc: StaticImageData;
  description: string;
}

export const guideContent: IGuideContent[] = [
  {
    heading: "Chapter One!",
    imageSrc: guideImages.userrobbery,
    description: "First description.",
  },
  {
    heading: "Chapter Two!",
    imageSrc: guideImages.userrobberyone,
    description: "Second description.",
  },
  {
    heading: "Chapter Three!",
    imageSrc: guideImages.userwhores,
    description: "Third description.",
  },
  {
    heading: "Chapter Four!",
    imageSrc: guideImages.userwhoresone,
    description: "Fourth description.",
  },
  {
    heading: "Chapter Five!",
    imageSrc: guideImages.userbank,
    description: "Fifth description.",
  },
  {
    heading: "Chapter Six!",
    imageSrc: guideImages.userstats,
    description: "Sixth description.",
  },
  {
    heading: "Chapter Seven!",
    imageSrc: guideImages.usermenu,
    description: "Seventh description.",
  },
];
