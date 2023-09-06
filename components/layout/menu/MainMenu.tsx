import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseMobileIcon,
} from "@/components/ui/icons";
import Icon from "@/components/ui/icons/Icon";
import menuItems from "@/constants/sections/menu";
import styles from "./MainMenu.module.scss";
import NavItem from "./navitem/NavItem";

export interface IMainMenu {
  isMenuOpen?: boolean;
  toggleMenu: () => void;
  handleMobileMenuClick: () => void;
}

const MainMenu: React.FC<IMainMenu> = ({
  isMenuOpen,
  toggleMenu,
  handleMobileMenuClick,
}) => {
  return (
    <nav className={`${styles.container} ${isMenuOpen && styles.open}`}>
      {isMenuOpen && (
        <div onClick={handleMobileMenuClick} className="mobileClose">
          <Icon
            component={CloseMobileIcon}
            width={48}
            height={48}
            viewBox="24 24"
          />
        </div>
      )}
      <ul className={styles.content}>
        {menuItems.map((item) => (
          <NavItem
            key={item.actionName}
            component={item.component}
            width={item.width}
            height={item.height}
            viewBox={item.viewBox}
            actionName={item.actionName}
            href={item.href}
            {...("onClick" in item && { onClick: item.onClick })}
          />
        ))}
      </ul>
      <div className={styles.icon} onClick={toggleMenu}>
        {isMenuOpen ? (
          <Icon
            component={ArrowLeftIcon}
            width={24}
            height={24}
            viewBox="24 24"
          />
        ) : (
          <Icon
            component={ArrowRightIcon}
            width={24}
            height={24}
            viewBox="24 24"
          />
        )}
      </div>
      <div className={styles.sidebar} onClick={toggleMenu}>
        <p className="custom-label">Main Menu</p>
      </div>
    </nav>
  );
};

export default MainMenu;
