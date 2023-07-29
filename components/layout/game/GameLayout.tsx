import { ReactNode, useState } from "react";

import MainMenu from "@/components/layout/menu/MainMenu";
import ActionsInterface from "@/components/user/actions/ActionsInterface";

import {
  HamburgerMenuIcon,
  Icon,
  ProfileIcon,
  RobberyIcon,
} from "@/components/ui/icons";
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
  const [isActionsInterfaceVisible, setActionsInterfaceVisible] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setUserInterfaceVisible((prevState) => !prevState);
  };

  const handleActionsClick = () => {
    setActionsInterfaceVisible((prevState) => !prevState);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
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
            <div className={styles.mobileIcons}>
              <div onClick={handleProfileClick} className={styles.mobileIcon}>
                <Icon
                  component={ProfileIcon}
                  width={48}
                  height={48}
                  viewBox="52 52"
                />
                <p className="custom-label">User</p>
              </div>
              <div onClick={handleActionsClick} className={styles.mobileIcon}>
                <Icon
                  component={RobberyIcon}
                  width={48}
                  height={48}
                  viewBox="512 512"
                />
                <p className="custom-label">Actions</p>
              </div>
              <div
                onClick={handleMobileMenuClick}
                className={styles.mobileIcon}
              >
                <Icon
                  component={HamburgerMenuIcon}
                  width={48}
                  height={48}
                  viewBox="24 24"
                />
                <p className="custom-label">Menu</p>
              </div>
            </div>
            <div className={styles.userWrapper}>
              <div
                className={`${styles.userInterface} ${
                  isUserInterfaceVisible && styles.mobileOpen
                }`}
              >
                <UserInterface
                  isUserInterfaceVisible={isUserInterfaceVisible}
                  handleProfileClick={handleProfileClick}
                />
              </div>
              <div
                className={`${styles.navigation} ${isMenuOpen && styles.open} ${
                  isMobileMenuOpen && styles.mobileOpen
                }`}
              >
                <MainMenu
                  isMenuOpen={isMenuOpen}
                  handleMobileMenuClick={handleMobileMenuClick}
                  toggleMenu={toggleMenu}
                />
              </div>
            </div>
            <div
              className={`${styles.actionInterface} ${
                isActionsInterfaceVisible && styles.mobileOpen
              }`}
            >
              <ActionsInterface
                isActionsInterfaceVisible={isActionsInterfaceVisible}
                handleActionsClick={handleActionsClick}
              />
            </div>
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
