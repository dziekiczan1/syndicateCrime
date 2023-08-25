import { ReactNode, useContext, useEffect, useState } from "react";

import MainMenu from "@/components/layout/menu/MainMenu";
import ActionsInterface from "@/components/user/actions/ActionsInterface";

import SabotageModal from "@/components/content/sabotage/SabotageModal";
import {
  HamburgerMenuIcon,
  Icon,
  ProfileIcon,
  RobberyIcon,
} from "@/components/ui/icons";
import Modal from "@/components/ui/modal/Modal";
import Slider from "@/components/ui/slider/Slider";
import UserInterface from "@/components/user/interface/UserInterface";
import sliderData from "@/constants/descriptions/sliderdata";
import UserContext from "@/store/user-context";
import Footer from "../footer/Footer";
import Logo from "../logo/Logo";
import styles from "./GameLayout.module.scss";

export interface IGameLayout {
  children?: ReactNode;
}

const GameLayout: React.FC<IGameLayout> = ({ children }) => {
  const { user } = useContext(UserContext);
  const [showSabotageMessage, setShowSabotageMessage] = useState(false);
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

  useEffect(() => {
    const hasSeenSabotageMessage = localStorage.getItem(
      "hasSeenSabotageMessage"
    );
    const today = new Date().toISOString().split("T")[0];
    const lastSeenDate = localStorage.getItem("lastSeenDate");

    if (
      !hasSeenSabotageMessage ||
      hasSeenSabotageMessage === "false" ||
      (lastSeenDate !== today &&
        user &&
        user.sabotage?.lastLostSabotageDetails?.date === today)
    ) {
      setShowSabotageMessage(true);
      localStorage.setItem("lastSeenDate", today);
    }
  }, [user]);

  const handleCloseSabotageMessage = () => {
    localStorage.setItem("hasSeenSabotageMessage", "true");
    setShowSabotageMessage(false);
  };

  return (
    <>
      <div className={styles.container}>
        {showSabotageMessage &&
          user &&
          user.sabotage?.lastLostSabotageDetails && (
            <Modal
              isOpen={showSabotageMessage}
              onClose={handleCloseSabotageMessage}
            >
              <SabotageModal />
            </Modal>
          )}
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
                } ${isUserInterfaceVisible && "body-noscroll"}`}
              >
                <UserInterface
                  isUserInterfaceVisible={isUserInterfaceVisible}
                  handleProfileClick={handleProfileClick}
                />
              </div>
              <div
                className={`${styles.navigation} ${isMenuOpen && styles.open} ${
                  isMobileMenuOpen && styles.mobileOpen
                } ${isMobileMenuOpen && "body-noscroll"}`}
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
              } ${isActionsInterfaceVisible && "body-noscroll"}`}
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
