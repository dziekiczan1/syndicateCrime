import { StaticImageData } from "next/image";
import alleyImages from "../images/alley";

export interface IDistrictActions {
  short: string;
  name: string;
  imageSrc: StaticImageData;
  description: string;
  missionTime: string;
  time: number;
}

export const districtActions: IDistrictActions[] = [
  {
    short: "grandmother",
    name: "Grandmother's Heist",
    imageSrc: alleyImages.heist,
    description: "Help grandmother go through pedestrian lane",
    missionTime: "4 hours",
    time: 14400,
  },
];
