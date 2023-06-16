interface IPageDescriptions {
  [key: string]: {
    description: string;
    title: string;
  };
}

const pageDescriptions: IPageDescriptions = {
  profile: {
    description:
      "Unleash the power of statistics and dive into the world of competitive gaming. Explore rankings, leaderboards, and player standings as you witness the pursuit of excellence. Discover the secrets of success and join the elite in their quest for glory. Are you ready to embrace the challenge and make your mark among the top players? Step into the realm of statistics and let the adventure unfold.",
    title: "Player Rankings: Rise to the Top!",
  },
  statistics: {
    description:
      "Explore the profile of an accomplished player and dive into their gaming journey. Gain insights into their achievements, stats, and progress as they conquer challenges and make their mark in the gaming world. From epic victories to strategic triumphs, follow their path to greatness. Are you ready to delve into the realm of gaming excellence and discover what it takes to become a legend?",
    title: "Player Profile: A Journey of Success",
  },
  credit: {
    description:
      "Unleash the power of credits and unlock a world of possibilities in Syndicate Crime. Explore a realm of exclusive advantages, premium upgrades, and strategic tools that will enhance your gaming experience. From acquiring rare items to gaining an edge over your rivals, immerse yourself in the realm of credits and elevate your gameplay to new heights. Are you ready to embrace the benefits and forge your path to success?",
    title: "Credits: Enhance Your Gaming Journey",
  },
  help: {
    description:
      "Embark on a quest to unlock the secrets of Syndicate Crime and uncover the hidden treasures of knowledge. Discover valuable insights, expert tips, and step-by-step guidance that will empower you on your journey towards mastery. From conquering challenges to unleashing your full potential, dive into a world of limitless possibilities. Are you prepared to embark on this adventure and become a true champion?",
    title: "Help: Your Ultimate Guide to Mastery",
  },
  robbery: {
    description:
      "Experience the thrill of high-stakes robberies. Plan, execute, and reap the rewards as you embark on daring heists in pursuit of wealth and notoriety. Test your skills, outsmart security systems, and leave your mark as a master thief. Are you ready to step into the world of crime and become a legend?",
    title: "Select a place for robbery",
  },
};
export default pageDescriptions;
