import { StaticImageData } from "next/image";
import hospitalImages from "../images/hospital";

export interface IHospitalActions {
  name: string;
  imageSrc: StaticImageData;
  description: string;
  costEnergy?: string;
  costMoney?: string;
  bonus: string;
  buttonText: string;
  onAction: (() => void) | string;
}

export const hospitalActions: IHospitalActions[] = [
  {
    name: "Methadone solution",
    imageSrc: hospitalImages.potion,
    description:
      "The Methadone solution is a specialized formulation designed to aid in the treatment of opioid addiction. This potent elixir acts as a beacon of hope, providing relief from withdrawal symptoms and reducing addiction by 20%. As you take each measured dose, it gently guides you towards a healthier and more fulfilling future, empowering you to break free from the chains of addiction.",
    costEnergy: "20%",
    costMoney: "$10,000",
    bonus: "Reduces addiction by 20%",
    buttonText: "Use Methadone",
    onAction: "solution",
  },
  {
    name: "Suboxone pills",
    imageSrc: hospitalImages.pills,
    description:
      "The Suboxone pills offer a discreet and convenient solution for individuals seeking to break free from the chains of opioid addiction. These small, round pills provide a pathway to liberation without the need for a daring escape. By investing your full energy into this option, you can secure your release from the prison of addiction, enabling you to embark on a journey of recovery and renewal.",
    costEnergy: "100%",
    bonus: "Reduces addiction by 100%",
    buttonText: "Take Suboxone",
    onAction: "pills",
  },
  {
    name: "Naltrexone injection",
    imageSrc: hospitalImages.vaccine,
    description:
      "The Naltrexone injection is a powerful tool in the battle against addiction, offering a direct and effective approach to breaking free. Administered by a medical professional, this injection delivers a potent dose of Naltrexone, a medication known for its ability to block the effects of opioids and reduce cravings. By investing a significant financial sum, you provide yourself with the opportunity to leave the confines of addiction behind and step into a future filled with hope and renewed possibilities.",
    costMoney: "$50,000.00",
    bonus: "Reduces addiction by 100%",
    buttonText: "Receive Naltrexone",
    onAction: "injection",
  },
];

export const lifeActions: IHospitalActions[] = [
  {
    name: "Band-Aid",
    imageSrc: hospitalImages.bandaid,
    description:
      "The Band-Aid is a simple yet effective solution for minor injuries. It can heal wounds, scrapes, and bruises, restoring 20% of your life and allowing you to get back on your feet.",
    costEnergy: "20%",
    costMoney: "$10,000",
    bonus: "Heals 20% of life",
    buttonText: "Apply Band-Aid",
    onAction: "bandaid",
  },
  {
    name: "First Aid Kit",
    imageSrc: hospitalImages.firstaid,
    description:
      "The First Aid Kit is a comprehensive set of medical supplies that can treat moderate to severe injuries. It provides extensive care, healing 100% of your life and ensuring a full recovery.",
    costEnergy: "100%",
    bonus: "Heals 100% of life",
    buttonText: "Use First Aid Kit",
    onAction: "firstaidkit",
  },
  {
    name: "Life Elixir",
    imageSrc: hospitalImages.elixir,
    description:
      "The Life Elixir is a miraculous potion known for its extraordinary healing properties. It can mend the most critical injuries and ailments, restoring 100% of your life and granting you a new lease on life.",
    costMoney: "$50,000.00",
    bonus: "Heals 100% of life",
    buttonText: "Drink Life Elixir",
    onAction: "lifeelixir",
  },
];
