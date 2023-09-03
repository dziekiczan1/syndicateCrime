import { StaticImageData } from "next/image";
import sectionsImages from "../images/sections";

interface IPageDescriptions {
  [key: string]: {
    description: string;
    title: string;
    image: StaticImageData;
  };
}

const pageDescriptions: IPageDescriptions = {
  statistics: {
    description:
      "Unleash the power of statistics and dive into the world of competitive gaming. Explore rankings, leaderboards, and player standings as you witness the pursuit of excellence. Discover the secrets of success and join the elite in their quest for glory. Are you ready to embrace the challenge and make your mark among the top players? Step into the realm of statistics and let the adventure unfold.",
    title: "Player Rankings: Rise to the Top!",
    image: sectionsImages.statistics,
  },
  profile: {
    description:
      "Explore the profile of an accomplished player and dive into their gaming journey. Gain insights into their achievements, stats, and progress as they conquer challenges and make their mark in the gaming world. From epic victories to strategic triumphs, follow their path to greatness. Are you ready to delve into the realm of gaming excellence and discover what it takes to become a legend?",
    title: "Player Profile: A Journey of Success",
    image: sectionsImages.profile,
  },
  credit: {
    description:
      "Unleash the power of credits and unlock a world of possibilities in Syndicate Crime. Explore a realm of exclusive advantages, premium upgrades, and strategic tools that will enhance your gaming experience. From acquiring rare items to gaining an edge over your rivals, immerse yourself in the realm of credits and elevate your gameplay to new heights. Are you ready to embrace the benefits and forge your path to success?",
    title: "Credits: Enhance Your Gaming Journey",
    image: sectionsImages.credit,
  },
  help: {
    description:
      "Embark on a quest to unlock the secrets of Syndicate Crime and uncover the hidden treasures of knowledge. Discover valuable insights, expert tips, and step-by-step guidance that will empower you on your journey towards mastery. From conquering challenges to unleashing your full potential, dive into a world of limitless possibilities. Are you prepared to embark on this adventure and become a true champion?",
    title: "Help: Your Ultimate Guide to Mastery",
    image: sectionsImages.help,
  },
  robbery: {
    description:
      "Experience the thrill of high-stakes robberies. Plan, execute, and reap the rewards as you embark on daring heists in pursuit of wealth and notoriety. Test your skills, outsmart security systems, and leave your mark as a master thief. Are you ready to step into the world of crime and become a legend?",
    title: "Select a place for robbery",
    image: sectionsImages.robbery,
  },
  gang: {
    description:
      "Step into the gritty world of organized crime and join a formidable gang. Collaborate with fellow gangsters, plan strategic moves, and expand your empire. From illicit operations to turf wars, navigate the treacherous landscape of the underworld. Establish dominance, accumulate wealth, and command respect as you climb the ranks of the criminal hierarchy. Are you ready to unleash your inner gangster and seize control of the city? Brace yourself for an adrenaline-fueled journey where loyalty, ambition, and survival are paramount.",
    title: "Gangster's Paradise: Conquer the Underworld",
    image: sectionsImages.gang,
  },
  nightclub: {
    description:
      "Welcome to the electrifying world of the Nightclub, where the rhythm takes over and the party never ends. Immerse yourself in the vibrant atmosphere of pulsating music, dazzling lights, and energetic crowds. Dance to the hottest beats, socialize with fellow partygoers, and experience the ultimate nightlife adventure. From top DJs spinning the latest tracks to captivating performances, the Nightclub is your gateway to a world of excitement and indulgence. Get ready to let loose, create unforgettable memories, and embrace the night like never before. Join us at the Nightclub and become a part of the exhilarating nightlife scene that will keep you coming back for more.",
    title: "Nightclub: Where the Beats Come Alive",
    image: sectionsImages.nightclub,
  },
  sabotage: {
    description:
      "Immerse yourself in the treacherous world of organized crime and become a master of sabotage. Join forces with your fellow gangsters to carry out calculated acts of mayhem and disrupt the operations of rival gangs. From sabotaging illicit businesses to crippling their operations, leave a trail of chaos and seize control of the underworld. Employ cunning strategies, exploit weaknesses, and strike fear into the hearts of your enemies. As a ruthless mobster, you hold the power to undermine the very foundations of rival gangs and establish your dominance. Are you ready to unleash havoc and cement your place as a feared and respected figure in the criminal underworld?",
    title: "Sabotage: Unleash Chaos and Disrupt the Order",
    image: sectionsImages.sabotage,
  },
  whores: {
    description:
      "Step into the lucrative world of the sex industry and establish your empire of seductive power. As a shrewd entrepreneur, you'll recruit a team of enticing ladies to work for you, generating steady income day after day. Navigate the complexities of this provocative business, from managing your workforce to satisfying the desires of your clients. With charm, strategy, and a keen eye for opportunity, you can rise to the top of the adult entertainment industry. Embrace the allure and luxury that come with this realm of pleasure, and watch your wealth and influence grow. Are you ready to dominate the world of lust and temptation?",
    title: "Whores: Building Your Empire with Seductive Power",
    image: sectionsImages.whores,
  },
  blackmarket: {
    description:
      "Explore the enigmatic Black Market, a hidden sanctuary where you can acquire an array of illegal goods without questions asked. As an intrepid individual seeking unique and forbidden items, you'll gain access to a realm of concealed transactions and rare contraband. From powerful weapons to illicit substances, this dark marketplace is your gateway to obtaining the forbidden and the extraordinary. Exercise caution, for the identities of buyers and sellers are shielded behind layers of secrecy. Navigate through this shadowy landscape and indulge your desires for the clandestine and the exclusive. Will you embrace the allure of the Black Market, venturing into its depths to claim the forbidden treasures it holds?",
    title: "BlackMarket: Unleashing the Underworld's Forbidden Trade",
    image: sectionsImages.market,
  },
  dealer: {
    description:
      "Explore the clandestine world of the Dealer, where forbidden substances hold the key to unlocking hidden powers. Enhance your energy levels and gain a competitive edge through the purchase of potent drugs. But beware, as these substances come with the risk of addiction, leading to unforeseen consequences. Exercise caution as you navigate this treacherous path, balancing the benefits of increased energy with the dangers of spiraling into dependency. Are you ready to tread the thin line between power and peril?",
    title: "Elevate Your Performance, Accept the Risks",
    image: sectionsImages.dealer,
  },
  market: {
    description:
      "Embark on a journey into the cutthroat world of corporate rivalry. Here, you have the opportunity to invest in the stock of various companies, each with its own unique prospects and risks. Buy low, sell high, and watch your wealth grow as you navigate the unpredictable fluctuations of the stock market. But remember, with great profit potential comes great volatility. Make shrewd decisions, monitor market trends, and master the art of the deal to emerge as a financial tycoon in this thrilling, high-stakes game of stocks and shares.",
    title: "Dive into the Corporate World, Shape Your Fortune",
    image: sectionsImages.market,
  },
  buildings: {
    description:
      "Embark on a journey of urban development and financial prowess in the Buildings market. Acquire various properties, from towering skyscrapers to charming residential complexes, as you aim to grow your empire. Make strategic decisions to maximize profits and capitalize on real estate opportunities. But remember, success comes with risks, and market fluctuations can turn fortunes. Take calculated risks, manage your portfolio wisely, and prove yourself as a master of the real estate market. Are you prepared to build a cityscape that stands the test of time?",
    title: "Expand Your Empire, Master the Market of Buildings",
    image: sectionsImages.buildings,
  },
  university: {
    description:
      "Welcome to our esteemed University, where knowledge knows no bounds and opportunities are endless. Dive into our Course Emporium, a realm of transformative learning experiences that empower you to master new skills and explore diverse horizons. Discover an array of courses tailored to your ambitions, from business acumen to social dynamics. Forge your path with confidence as you seize the chance to enhance your expertise, unlock your potential, and embrace the journey of continuous growth. Are you ready to embark on a pursuit of knowledge that shapes a future of possibilities?",
    title: "Elevate Your Expertise and Unleash Potential",
    image: sectionsImages.university,
  },
  hospital: {
    description:
      "At our hospital, we specialize in addiction recovery and helping individuals reclaim their lives. With a team of experienced professionals and evidence-based treatment approaches, we provide comprehensive support and care for individuals struggling with addiction. Whether you or a loved one is facing addiction, we are here to help you on the path to recovery. Our personalized treatment plans, compassionate staff, and supportive environment create an ideal setting for your healing journey. Take the first step towards a brighter future and regain control of your life at our trusted hospital.",
    title: "Recover and Reclaim Your Life",
    image: sectionsImages.hospital,
  },
  bank: {
    description:
      "Securely manage your hard-earned savings at the Bank. With state-of-the-art security measures and expert financial services, the Bank offers you a reliable and convenient way to stash or withdraw your funds. Whether you're looking to protect your wealth or make strategic investments, the Bank is your trusted partner. Take control of your financial future and let us help you make the most of your hard-earned savings. Discover the benefits of secure, reliable, and convenient banking at the Bank today. Join the millions of satisfied customers who have chosen the Bank as their trusted financial partner.",
    title: "Manage Your Wealth with Confidence",
    image: sectionsImages.bank,
  },
  casino: {
    description:
      "Step into the electrifying world of casino gaming, where excitement and entertainment know no bounds. At our casino, you'll find a world of opportunity and chance waiting for you. Whether you're a seasoned gambler or trying your luck for the first time, our casino offers an unforgettable experience. The possibilities are endless. Join us for a night of exhilaration, where fortunes can change with the turn of a card. Are you ready to test your luck and embrace the thrill of casino gaming?",
    title: "Experience the Thrill of Casino Gaming",
    image: sectionsImages.casino,
  },
  prison: {
    description:
      "Our prison rehabilitation program is dedicated to providing comprehensive support and opportunities for positive change. We believe in the power of rehabilitation to transform lives and pave the way for a brighter future. Through education, vocational training, counseling, and therapeutic interventions, we strive to empower individuals within the prison system to rebuild their lives and reintegrate successfully into society. With a focus on compassion, personal growth, and community support, we are committed to breaking the cycle of reoffending and offering a pathway to a better tomorrow. Join us in our mission to create a safer and more inclusive society by supporting the rehabilitation and reintegration of individuals within the prison community.",
    title: "A Path to Redemption: Transforming Lives behind Bars",
    image: sectionsImages.prison,
  },
};
export default pageDescriptions;
