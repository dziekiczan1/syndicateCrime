import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";

import Button from "@/components/ui/button/Button";
import {
  CharismaIcon,
  EnduranceIcon,
  IntelligenceIcon,
  MoneyIcon,
  RespectIcon,
  StrengthIcon,
} from "@/components/ui/icons";
import ProgressBar from "@/components/ui/progressbar/ProgressBar";
import UserContext, { IUser } from "@/store/user-context";
import Avatar from "../avatar/Avatar";
import StatsNode from "../stats/StatsNode";
import styles from "./UserInterface.module.scss";

export interface IUserInterface {
  user?: IUser | null;
}

const UserInterface: React.FC<IUserInterface> = () => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);
  const userStats = user?.defaultParams;
  const iconColor = "#666666";

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
          <Button onClick={logoutHandler}>Logout</Button>
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
              <h3>{user.username}</h3>
              <p className={styles.class}>{userStats.class}</p>
              <p className={styles.class}>{userStats.morale}</p>
              <div className={styles.stats}>
                <ProgressBar name="Energy" completed={userStats.energy} />
                <ProgressBar name="Life" completed={userStats.life} />
                <ProgressBar name="Addiction" completed={userStats.addiction} />
              </div>
            </div>
          </div>
          <div className={styles.userStats}>
            <StatsNode
              component={StrengthIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="512 512"
              statsValue={userStats.strength}
              statsName="Strength"
            />
            <StatsNode
              component={EnduranceIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="256 256"
              statsValue={userStats.endurance}
              statsName="Endurance"
            />
            <StatsNode
              component={MoneyIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="48 48"
              statsValue={userStats.money}
              statsName="Money"
            />
            <StatsNode
              component={IntelligenceIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="32 32"
              statsValue={userStats.intelligence}
              statsName="Intelligence"
            />
            <StatsNode
              component={CharismaIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="512 512"
              statsValue={userStats.charisma}
              statsName="Charisma"
            />
            <StatsNode
              component={RespectIcon}
              fill={iconColor}
              width={48}
              height={48}
              viewBox="512 512"
              statsValue={userStats.respect}
              statsName="Respect"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
