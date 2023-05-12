import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";

import Button from "@/components/ui/button/Button";
import ProgressBar from "@/components/ui/progressbar/ProgressBar";
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
      {session && user && userStats && (
        <div className={styles.userContainer}>
          <div className={styles.panelContainer}>
            <div className={styles.avatar}>
              <Avatar
                width={380}
                height={380}
                src={user.avatar}
                alt={user.username}
              />
            </div>
            <div className={styles.user}>
              <h4>{user.username}</h4>
              <p className={styles.class}>{userStats.class}</p>
              <p className={styles.class}>{userStats.morale}</p>
              <div className={styles.stats}>
                <ProgressBar name="Energy" completed={userStats.energy} />
                <ProgressBar name="Life" completed={userStats.life} />
                <ProgressBar name="Addiction" completed={userStats.addiction} />
              </div>
            </div>
          </div>
          <div className={styles.user}>
            <p>{userStats.class}</p>
            <p>{userStats.morale}</p>
          </div>
        </div>
      )}
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default UserInterface;
