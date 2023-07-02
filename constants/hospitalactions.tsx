import { images } from "@/constants";
import { StaticImageData } from "next/image";

export interface IHospitalActions {
  name: string;
  imageSrc: StaticImageData;
  description: string;
  cost: string;
  buttonText: string;
  onAction: (() => void) | string;
}

export const hospitalActions: IHospitalActions[] = [
  {
    name: "Methadone solution",
    imageSrc: images.potion,
    description:
      "The Methadone solution is a specialized formulation designed to aid in the treatment of opioid addiction. This potent elixir acts as a beacon of hope, providing relief from withdrawal symptoms and reducing addiction by 20%. As you take each measured dose, it gently guides you towards a healthier and more fulfilling future, empowering you to break free from the chains of addiction.",
    cost: "Energy: 20% / Money: $10,000",
    buttonText: "Use Methadone",
    onAction: "solution",
  },
  {
    name: "Suboxone pills",
    imageSrc: images.pills,
    description:
      "The Suboxone pills offer a discreet and convenient solution for individuals seeking to break free from the chains of opioid addiction. These small, round pills provide a pathway to liberation without the need for a daring escape. By investing your full energy into this option, you can secure your release from the prison of addiction, enabling you to embark on a journey of recovery and renewal.",
    cost: "Energy: 100%",
    buttonText: "Take Suboxone",
    onAction: "pills",
  },
  {
    name: "Naltrexone injection",
    imageSrc: images.vaccine,
    description:
      "The Naltrexone injection is a powerful tool in the battle against addiction, offering a direct and effective approach to breaking free. Administered by a medical professional, this injection delivers a potent dose of Naltrexone, a medication known for its ability to block the effects of opioids and reduce cravings. By investing a significant financial sum, you provide yourself with the opportunity to leave the confines of addiction behind and step into a future filled with hope and renewed possibilities.",
    cost: "Money: $50,000.00",
    buttonText: "Receive Naltrexone",
    onAction: "injection",
  },
];
