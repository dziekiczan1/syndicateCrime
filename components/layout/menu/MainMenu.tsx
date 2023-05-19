import styles from "./MainMenu.module.scss";

export interface IMainMenu {
  sampleTextProp?: string;
}

const MainMenu: React.FC<IMainMenu> = ({ sampleTextProp }) => {
  return <div className={styles.container}>asd{sampleTextProp}</div>;
};

export default MainMenu;
