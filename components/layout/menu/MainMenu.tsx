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
      {/* <div className={styles.icon}>
            <Icon
              component={component}
              width={width}
              height={height}
              fill={fill}
              viewBox={viewBox}
            />
          </div> */}
      <div className={styles.sidebar}>
        <p className="custom-label">Main Menu</p>
      </div>
    </nav>
  );
};

export default MainMenu;
