import { StaticImageData } from "next/image";
import sectionsImages from "../images/sections";

export interface ISlideProps {
  id: number;
  image: StaticImageData;
  title: string;
  link: string;
}

const sliderData: ISlideProps[] = [
  {
    id: 0,
    image: sectionsImages.robbery,
    title: "Robbery: Experience the Thrill!",
    link: "robbery",
  },
  {
    id: 1,
    image: sectionsImages.casino,
    title: "Casino: Hit the Jackpot!",
    link: "casino",
  },
  {
    id: 2,
    image: sectionsImages.dealer,
    title: "Dealer: Boost Your Energy!",
    link: "dealer",
  },
];

export default sliderData;
