import { useSession } from "next-auth/react";
import { useContext } from "react";

import Button from "@/components/ui/button/Button";
import { CloseMobileIcon, Icon } from "@/components/ui/icons";
import ProgressBar from "@/components/ui/progressbar/ProgressBar";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { getUserStatistics } from "@/constants/sections/userstats";
import UserContext, { IUser } from "@/store/user-context";
import Avatar from "../avatar/Avatar";
import StatsNode from "../stats/StatsNode";
import styles from "./UserInterface.module.scss";

export interface IUserInterface {
  user?: IUser | null;
  isUserInterfaceVisible?: boolean;
  handleProfileClick: () => void;
}

const UserInterface: React.FC<IUserInterface> = ({
  isUserInterfaceVisible,
  handleProfileClick,
}) => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);
  const userStats = user?.defaultParams;
  const userStatistics = getUserStatistics(userStats);

  return (
    <div
      className={`${styles.container} ${
        isUserInterfaceVisible && styles.mobileOpen
      }`}
    >
      {!session && status !== "loading" && (
        <div>
          <h1>Zaloguj się</h1>
          <Button link="/">Login</Button>
        </div>
      )}
      {isUserInterfaceVisible && (
        <div onClick={handleProfileClick} className={styles.mobileClose}>
          <Icon
            component={CloseMobileIcon}
            width={48}
            height={48}
            viewBox="24 24"
          />
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
              <h3>{user.username}</h3>
              <p className={styles.class}>{userStats.class}</p>
              <p className={styles.class}>
                {userStats.gang ? userStats.gang : "No gang affiliation"}
              </p>
              <div className={styles.stats}>
                <ProgressBar name="Energy" completed={userStats.energy} />
                <ProgressBar name="Life" completed={userStats.life} />
                <ProgressBar name="Addiction" completed={userStats.addiction} />
              </div>
            </div>
          </div>
          <div className={styles.userStats}>
            {userStatistics.map((stat) => (
              <Tooltip key={stat.statsName} text={stat.tooltipText}>
                <StatsNode
                  component={stat.component}
                  fill={stat.fill}
                  width={stat.width}
                  height={stat.height}
                  viewBox={stat.viewBox}
                  statsValue={stat.statsValue}
                  statsName={stat.statsName}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
