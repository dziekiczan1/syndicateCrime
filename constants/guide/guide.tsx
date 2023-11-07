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
    description:
      "Our menu offers a variety of actions, including robberies, gang activities, sabotage, and more. You'll discover how to navigate and use these options to make the most of your experience. Get ready to explore a world of possibilities as you master the art of making choices from our diverse menu!",
  },
  {
    heading: "Chapter Two!",
    imageSrc: guideImages.userrobberyone,
    description:
      "Robberies are a key way for users to earn money and improve their stats. Get ready to embark on thrilling heists and start accumulating wealth while enhancing your character's abilities. Let's kick off your journey as a seasoned robber!",
  },
  {
    heading: "Chapter Three!",
    imageSrc: guideImages.userwhoresone,
    description:
      "You can earn money through various activities like robberies, and with your hard-earned cash, you'll have the opportunity to make strategic investments. For example, you can purchase 'whores' to generate daily income and maximize your wealth. Discover the secrets of wise spending and watch your wealth grow as you make shrewd financial decisions!",
  },
  {
    heading: "Chapter Four!",
    imageSrc: guideImages.userbank,
    description:
      "Bank is a secure place where you can stash your hard-earned money. By depositing your wealth in the bank, not only will your income increase over time, but your funds will also be protected from potential attacks by other users. Learn how to use the bank to your advantage and ensure the safety and growth of your financial assets. It's a smart and strategic move for any user in our world!",
  },
  {
    heading: "Chapter Five!",
    imageSrc: guideImages.userstats,
    description:
      "As you perform various actions and engage in activities, your stats will grow and evolve. These stats play a crucial role in your gameplay and strategy, influencing your success in different aspects of the game. Whether you're focused on personal development or aiming to sabotage other players, a deep understanding of your stats is key to mastering the game. Get ready to discover how your actions directly impact your character's progress!",
  },
  {
    heading: "Chapter Six!",
    imageSrc: guideImages.usermenu,
    description:
      "With the user menu, you can access your profile, make changes to your character, and view important game statistics that provide insights into your progress. You also have the option to buy credits, a valuable in-game resource, and seek assistance by exploring our FAQ or revisiting this guide whenever you need a refresher. The user menu is your control center for a successful and enjoyable gaming experience. Get ready to explore all the possibilities it offers!",
  },
];
