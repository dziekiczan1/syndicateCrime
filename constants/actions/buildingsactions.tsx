import { StaticImageData } from "next/image";
import buildingImages from "../images/buildings";

export interface IBuildingsActions {
  name: string;
  imageSrc: StaticImageData;
  description: string;
  cost: number;
  bonus: number;
}

export const buildingsActions: IBuildingsActions[] = [
  {
    name: "Brewery",
    imageSrc: buildingImages.brewery,
    description:
      "Embrace the art of brewing at the Brewery, where you can produce exquisite beers. Acquire this establishment to reap substantial profits and savor a cold, refreshing brew every day.",
    cost: 100000,
    bonus: 100000,
  },
  {
    name: "Pharmacy",
    imageSrc: buildingImages.pharmacy,
    description:
      "As a health lifeline, the Pharmacy supplies essential remedies and plays a vital role in the community's well-being. Purchase this building to provide essential medical support and strengthen the city's health.",
    cost: 150000,
    bonus: 100000,
  },
  {
    name: "Laboratory",
    imageSrc: buildingImages.laboratory,
    description:
      "Innovate and push the boundaries of science at the Laboratory, where groundbreaking discoveries await. Acquiring this building grants access to cutting-edge research and potential world-changing breakthroughs.",
    cost: 200000,
    bonus: 100000,
  },
  {
    name: "City Hall",
    imageSrc: buildingImages.cityhall,
    description:
      "As the epicenter of governance, City Hall shapes the city's destiny with wisdom and foresight. Purchase this building to wield influence, steer policies, and build a harmonious community.",
    cost: 250000,
    bonus: 100000,
  },
  {
    name: "Library",
    imageSrc: buildingImages.library,
    description:
      "A haven for knowledge seekers, the Library houses a vast collection of books and nurtures intellectual growth. Own this establishment to promote learning, enrich minds, and foster a more enlightened society.",
    cost: 400000,
    bonus: 100000,
  },
  {
    name: "Hospital",
    imageSrc: buildingImages.hospital,
    description:
      "A sanctuary of compassion and healing, the Hospital stands ready to save lives and provide top-notch medical care. Invest in this facility to enhance the city's health and well-being.",
    cost: 500000,
    bonus: 100000,
  },
  {
    name: "City Mall",
    imageSrc: buildingImages.shop,
    description:
      "Step into the world of the City Mall, a shopping paradise offering a diverse range of stores. Invest in this dynamic retail hub to attract shoppers, and create a vibrant center of commerce in the heart of the city",
    cost: 1000000,
    bonus: 100000,
  },
  {
    name: "Skyscraper",
    imageSrc: buildingImages.skyscrappers,
    description:
      "Pierce the skyline and stand tall with the Skyscraper, a symbol of ambition and architectural marvel. Owning this landmark elevates your status and projects power over the city's landscape.",
    cost: 1500000,
    bonus: 100000,
  },
];
