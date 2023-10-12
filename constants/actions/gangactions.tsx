import { StaticImageData } from "next/image";
import gangImages from "../images/gang";

export interface IGangActions {
  name: string;
  title: string;
  imageSrc: StaticImageData;
  description: string;
  minRespect: number;
}

export const gangActions: IGangActions[] = [
  {
    name: "Nightshade Syndicate",
    title: "nightshade",
    imageSrc: gangImages.nightshade,
    description:
      "Immerse yourself in the clandestine world of the Nightshade Syndicate, a secretive organization shrouded in mystery and intrigue. As a member of this enigmatic gang, you'll delve into the art of covert operations, espionage, and strategic subterfuge. Uncover hidden agendas, infiltrate rival factions, and manipulate the shadows to your advantage. From coded messages to high-tech gadgets, you'll master the tools of deception and deception itself. Forge alliances and outmaneuver adversaries to climb the ranks of the Syndicate. Will you emerge as a shadowy puppet master, orchestrating events from the darkness?",
    minRespect: 4000,
  },
  {
    name: "Crimson Serpents",
    title: "crimson",
    imageSrc: gangImages.crimson,
    description:
      "Embrace the allure of danger and power as you join the ranks of the Crimson Serpents, a notorious gang known for their audacity and ruthlessness. In this world of organized chaos, you'll navigate the intricate web of criminal enterprises, illicit trades, and turf wars. As a Crimson Serpent, you'll be immersed in a life of adrenaline-fueled operations, daring robberies, and high-stakes gambits. Prove your mettle by executing precision heists, establishing lucrative criminal connections, and amassing wealth and influence. The city's underbelly will become your playground, and your reputation as a daring rogue will spread like wildfire.",
    minRespect: 4000,
  },
];
