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
    name: "Grandma's Urban Adventure",
    imageSrc: alleyImages.heist,
    description:
      "Embark on an urban adventure with Grandma as your guide. Follow her through the cityscape and enjoy local flavors. This 4-hour mission promises an unforgettable experience.",
    missionTime: "4 hours",
    time: 14400,
  },
  {
    short: "undercover",
    name: "Operation Undercover",
    imageSrc: alleyImages.heist,
    description:
      "Join the ranks of elite agents on a top-secret mission. Infiltrate enemy lines, gather vital intelligence, and unravel a web of espionage. Your 6-hour mission will test your wit and cunning.",
    missionTime: "6 hours",
    time: 21600,
  },
  {
    short: "treasure",
    name: "Treasure Hunt: Lost Relics",
    imageSrc: alleyImages.heist,
    description:
      "Embark on a thrilling treasure hunt through ancient ruins. Unearth lost relics, solve cryptic puzzles, and face unexpected challenges. Your 8-hour quest promises legendary discoveries.",
    missionTime: "8 hours",
    time: 28800,
  },
  {
    short: "racing",
    name: "Racing Rivalry",
    imageSrc: alleyImages.heist,
    description:
      "Rev your engines for a high-speed racing showdown. Compete against fierce rivals on twisting tracks, upgrade your car, and aim for victory in this 12-hour race to the finish.",
    missionTime: "12 hours",
    time: 43200,
  },
  {
    short: "enigma",
    name: "Sorcerer's Enigma",
    imageSrc: alleyImages.heist,
    description:
      "Enter the mystical world of sorcery and enchantment. Solve arcane puzzles, master ancient spells, and confront magical creatures. Your 16-hour journey into the unknown awaits.",
    missionTime: "16 hours",
    time: 57600,
  },
  {
    short: "heist",
    name: "Heist in the Shadows",
    imageSrc: alleyImages.heist,
    description:
      "Become a master thief on a daring heist through a shadowy metropolis. Outsmart security, crack safes, and steal valuable artifacts. Your 24-hour mission is the ultimate test of stealth.",
    missionTime: "24 hours",
    time: 86400,
  },
];
