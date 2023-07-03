import { ReactNode, useState } from "react";

import MainMenu from "@/components/layout/menu/MainMenu";
import ActionsInterface from "@/components/user/actions/ActionsInterface";
import UserInterface from "@/components/user/interface/UserInterface";

import Slider from "@/components/ui/slider/Slider";
import { sliderData } from "@/constants/descriptions/sliderdata";
import Logo from "../logo/Logo";
import styles from "./GameLayout.module.scss";

export interface IGameLayout {
  children?: ReactNode;
}

const GameLayout: React.FC<IGameLayout> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.sidebar}>
          <div className={styles.logoWrapper}>
            <Logo width={400} height={200} />
          </div>
          <div className={styles.userWrapper}>
            <div className={styles.userInterface}>
              <UserInterface />
            </div>
            <div
              className={`${styles.navigation} ${isMenuOpen && styles.open}`}
            >
              <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
          <ActionsInterface />
          <div className={styles.sliderWrapper}>
            <Slider slides={sliderData} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

export default GameLayout;
