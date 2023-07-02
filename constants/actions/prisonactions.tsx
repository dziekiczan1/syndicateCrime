import { StaticImageData } from "next/image";
import prisonImages from "../images/prison";

export interface IPrisonActions {
  name: string;
  imageSrc: StaticImageData;
  description: string;
  cost: string;
  buttonText: string;
  onAction: (() => void) | string;
}

export const prisonActions: IPrisonActions[] = [
  {
    name: "Escape",
    imageSrc: prisonImages.escape,
    description:
      "Use all of your energy to break free from prison. This daring action requires an immense physical and mental effort as you navigate through obstacles and elude capture. Exhausting every ounce of your energy, you take a calculated risk to regain your freedom, leaving no room for hesitation or second thoughts.",
    cost: "Energy: 100%",
    buttonText: "Escape",
    onAction: "escape",
  },
  {
    name: "Bail Out",
    imageSrc: prisonImages.bailout,
    description:
      "This option allows you to avoid the risks and challenges of an escape, offering a more straightforward path to freedom. By providing the required financial resources, you can regain your liberty and leave behind the confines of prison, resuming your life outside its walls.",
    cost: "Money: $100,000.00",
    buttonText: "Bail Out",
    onAction: "bailout",
  },
];
