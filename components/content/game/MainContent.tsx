import styles from "./MainContent.module.scss";

const MainContent: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>The Crime News</h2>
        <p>Published on May 24, 2023</p>
      </div>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>
          Introducing Syndicate Crime: Dive into the Dark World of Mafia
        </h3>
        <p className={styles.description}>
          Syndicate Crime is an immersive and thrilling mafia-themed game that
          puts you in the shoes of a mobster trying to climb the ranks of
          organized crime. Step into the dark underbelly of a sprawling city
          teeming with corruption, intrigue, and danger.
        </p>
        <p className={styles.description}>
          Immerse yourself in a deep narrative-driven experience as you navigate
          through a web of treachery, loyalty, and power struggles. Make
          strategic decisions, forge alliances, and carry out ruthless acts to
          establish your dominance in the criminal underworld.
        </p>
        <p className={styles.description}>
          Build and expand your criminal empire by recruiting a diverse cast of
          characters with unique skills and abilities. Train your crew, equip
          them with advanced weaponry, and assign them to various illicit
          operations such as heists, smuggling, and territorial expansion.
        </p>
        <p className={styles.description}>
          Explore a meticulously crafted cityscape, filled with iconic
          landmarks, seedy back alleys, and luxurious hideouts. Engage in
          high-stakes missions, engage in tense shootouts, and engage in intense
          car chases through the bustling streets of the city.
        </p>
        <p className={styles.description}>
          Syndicate Crime offers a dynamic and immersive gameplay experience
          with stunning visuals, realistic sound design, and a captivating
          soundtrack that sets the mood for your criminal escapades. Live the
          life of a mobster, where every decision carries consequences and the
          fate of your empire hangs in the balance.
        </p>
        <p className={styles.description}>
          Are you ready to leave your mark on the Syndicate Crime world? Prepare
          to make tough choices, forge alliances, and unleash your inner
          mobster. The city is yours for the taking. Play now and become the
          ultimate crime lord!
        </p>
      </div>
    </section>
  );
};

export default MainContent;
