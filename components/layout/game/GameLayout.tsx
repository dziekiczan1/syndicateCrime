import { ReactNode, useState } from "react";

import MainMenu from "@/components/layout/menu/MainMenu";
import ActionsInterface from "@/components/user/actions/ActionsInterface";
import UserInterface from "@/components/user/interface/UserInterface";

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
          <div className={styles.userWrapper}>
            <div className={styles.userInterface}>
              <UserInterface />
            </div>
            <div
              onClick={toggleMenu}
              className={`${styles.navigation} ${isMenuOpen && styles.open}`}
            >
              <MainMenu isMenuOpen={isMenuOpen} />
            </div>
          </div>
          <ActionsInterface />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default GameLayout;
