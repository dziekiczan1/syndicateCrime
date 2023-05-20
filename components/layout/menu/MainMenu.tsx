import menuItems from "@/constants/menu";
import styles from "./MainMenu.module.scss";
import NavItem from "./navitem/NavItem";

export interface IMainMenu {
  isMenuOpen?: boolean;
}

const MainMenu: React.FC<IMainMenu> = ({ isMenuOpen }) => {
  return (
    <div className={`${styles.container} ${isMenuOpen && styles.open}`}>
      <div className={styles.content}>
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
      </div>
      <div className={styles.sidebar}>
        <p className="custom-label">Main Menu</p>
      </div>
    </div>
  );
};

export default MainMenu;
