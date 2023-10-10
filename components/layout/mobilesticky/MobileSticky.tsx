import Avatar from "@/components/user/avatar/Avatar";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import styles from "./MobileSticky.module.scss";

export interface IMobileSticky {
  handleProfileClick: () => void;
}

const MobileSticky: React.FC<IMobileSticky> = ({ handleProfileClick }) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.stickyPhoto} onClick={handleProfileClick}>
        {user && (
          <Avatar
            width={54}
            height={54}
            src={user.avatar}
            alt={user.username}
          />
        )}
      </div>
      <div className={styles.stickyStats}>
        {user && (
          <div className={styles.userStats}>
            <p className={styles.statsValue}>{user.username}</p>

            <div className={styles.statsContainer}>
              <p className="custom-label">
                Money:{" "}
                <p className={styles.statsValue}>
                  ${user.defaultParams.money.toLocaleString()}
                </p>
              </p>
              <div className={styles.divider}></div>
              <p className="custom-label">
                Energy:{" "}
                <p className={styles.statsValue}>
                  {user.defaultParams.energy}%
                </p>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSticky;
