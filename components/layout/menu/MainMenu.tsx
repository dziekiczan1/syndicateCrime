import styles from "./MainMenu.module.scss";

export interface IMainMenu {
  isMenuOpen?: boolean;
}

const MainMenu: React.FC<IMainMenu> = ({ isMenuOpen }) => {
  return (
    <div className={`${styles.container} ${isMenuOpen && styles.open}`}>
      <div className={styles.content}>ASD</div>
      <div className={styles.sidebar}>
        <p className="custom-label">Main Menu</p>
      </div>
    </div>
  );
};

export default MainMenu;
