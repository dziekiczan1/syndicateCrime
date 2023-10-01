import { StaticImageData } from "next/image";
import districtImages from "../images/district";

export interface IDistrictActions {
  short: string;
  name: string;
  imageSrc: StaticImageData;
  description: string;
  missionTime: string;
  bonusOne: number;
  bonusTwo: number;
  time: number;
}

export const districtActions: IDistrictActions[] = [
  {
    short: "grandmother",
    name: "Grandma's Urban Adventure",
    imageSrc: districtImages.grandmother,
    description:
      "Embark on an urban adventure with Grandma as your guide. Follow her through the cityscape and enjoy local flavors. This 4-hour mission promises an unforgettable experience.",
    missionTime: "4 hours",
    bonusOne: 2500,
    bonusTwo: 500,
    time: 14400,
  },
  {
    short: "undercover",
    name: "Operation Undercover",
    imageSrc: districtImages.undercover,
    description:
      "Join the ranks of elite agents on a top-secret mission. Infiltrate enemy lines, gather vital intelligence, and unravel a web of espionage. Your 6-hour mission will test your wit and cunning.",
    missionTime: "6 hours",
    bonusOne: 5000,
    bonusTwo: 750,
    time: 21600,
  },
  {
    short: "treasure",
    name: "Treasure Hunt: Lost Relics",
    imageSrc: districtImages.treasure,
    description:
      "Embark on a thrilling treasure hunt through ancient ruins. Unearth lost relics, solve cryptic puzzles, and face unexpected challenges. Your 8-hour quest promises legendary discoveries.",
    missionTime: "8 hours",
    bonusOne: 7500,
    bonusTwo: 1000,
    time: 28800,
  },
  {
    short: "racing",
    name: "Racing Rivalry",
    imageSrc: districtImages.racing,
    description:
      "Rev your engines for a high-speed racing showdown. Compete against fierce rivals on twisting tracks, upgrade your car, and aim for victory in this 12-hour race to the finish.",
    missionTime: "12 hours",
    bonusOne: 10000,
    bonusTwo: 1500,
    time: 43200,
  },
  {
    short: "enigma",
    name: "Enigmatic Riddles",
    imageSrc: districtImages.enigma,
    description:
      "Embark on a journey of puzzling enigmas and riddles. Challenge your mind with cryptic conundrums and unlock the secrets hidden within. Your 16-hour adventure into the world of mysteries awaits.",
    missionTime: "16 hours",
    bonusOne: 17500,
    bonusTwo: 2000,
    time: 57600,
  },
  {
    short: "heist",
    name: "Heist in the Shadows",
    imageSrc: districtImages.heist,
    description:
      "Become a master thief on a daring heist through a shadowy metropolis. Outsmart security systems, crack safes, and steal valuable artifacts. Your thrilling 24-hour mission is the ultimate test of stealth.",
    missionTime: "24 hours",
    bonusOne: 25000,
    bonusTwo: 3000,
    time: 86400,
  },
];
