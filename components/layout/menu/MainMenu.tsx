import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import Icon from "@/components/ui/icons/Icon";
import menuItems from "@/constants/menu";
import styles from "./MainMenu.module.scss";
import NavItem from "./navitem/NavItem";

export interface IMainMenu {
  isMenuOpen?: boolean;
}

const MainMenu: React.FC<IMainMenu> = ({ isMenuOpen }) => {
  return (
    <nav className={`${styles.container} ${isMenuOpen && styles.open}`}>
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
          />
        ))}
      </ul>
      <div className={styles.icon}>
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
      <div className={styles.sidebar}>
        <p className="custom-label">Main Menu</p>
      </div>
    </nav>
  );
};

export default MainMenu;
