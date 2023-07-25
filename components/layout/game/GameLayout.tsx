import { ReactNode, useState } from "react";

import MainMenu from "@/components/layout/menu/MainMenu";
import ActionsInterface from "@/components/user/actions/ActionsInterface";

import { Icon, ProfileIcon } from "@/components/ui/icons";
import Slider from "@/components/ui/slider/Slider";
import UserInterface from "@/components/user/interface/UserInterface";
import sliderData from "@/constants/descriptions/sliderdata";
import Footer from "../footer/Footer";
import Logo from "../logo/Logo";
import styles from "./GameLayout.module.scss";

export interface IGameLayout {
  children?: ReactNode;
}

const GameLayout: React.FC<IGameLayout> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isUserInterfaceVisible, setUserInterfaceVisible] = useState(false);

  const handleProfileClick = () => {
    setUserInterfaceVisible((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.actions}>
          <div className={styles.sidebar}>
            <div className={styles.logoWrapper}>
              <Logo width={674} height={301} />
            </div>
            <div className={styles.userWrapper}>
              <div className={styles.mobileIcons}>
                <div onClick={handleProfileClick} className={styles.mobileIcon}>
                  <Icon
                    component={ProfileIcon}
                    width={24}
                    height={24}
                    viewBox="52 52"
                  />
                </div>
                <div onClick={handleProfileClick} className={styles.mobileIcon}>
                  <Icon
                    component={ProfileIcon}
                    width={24}
                    height={24}
                    viewBox="52 52"
                  />
                </div>
                <div onClick={handleProfileClick} className={styles.mobileIcon}>
                  <Icon
                    component={ProfileIcon}
                    width={24}
                    height={24}
                    viewBox="52 52"
                  />
                </div>
              </div>
              <div
                className={`${styles.userInterface} ${
                  isUserInterfaceVisible && styles.mobileOpen
                }`}
              >
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
      <Footer />
    </>
  );
};

export default GameLayout;
