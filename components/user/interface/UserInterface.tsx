import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";

import Button from "@/components/ui/button/Button";
import UserContext, { IUser } from "@/store/user-context";
import Avatar from "../avatar/Avatar";
import styles from "./UserInterface.module.scss";

export interface IUserInterface {
  user?: IUser | null;
}

const UserInterface: React.FC<IUserInterface> = () => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);
  const userStats = user?.defaultParams;

  function logoutHandler() {
    signOut();
  }

  return (
    <div className={styles.container}>
      {!session && status !== "loading" && (
        <div>
          <h1>Zaloguj się</h1>
          <Button link="/">Login</Button>
        </div>
      )}
      {session && user && (
        <div className={styles.panelContainer}>
          <div className={styles.avatar}>
            <Avatar
              width={180}
              height={180}
              src={user.avatar}
              alt={user.username}
            />
          </div>
          <div className={styles.user}>
            <h1>{user.username}</h1>
            {userStats && (
              <div className={styles.stats}>
                <p>class: {userStats.class}</p>
                <p>morale: {userStats.morale}</p>
                <p>respect: {userStats.respect}</p>
                <p>energy: {userStats.energy}</p>
                <p>life: {userStats.life}</p>
                <p>addiction: {userStats.addiction}</p>
                <p>intelligence: {userStats.intelligence}</p>
                <p>strength: {userStats.strength}</p>
                <p>endurance: {userStats.endurance}</p>
                <p>money: {userStats.money}</p>
              </div>
            )}
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
