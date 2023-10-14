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
          <div className={styles.statsContainer}>
            <p className="custom-label">
              Energy:{" "}
              <span className={styles.statsValue}>
                {user.defaultParams.energy}%
              </span>
            </p>
            <p className="custom-label">
              Respect:{" "}
              <span className={styles.statsValue}>
                {user.defaultParams.respect}
              </span>
            </p>
            <p className="custom-label">
              Money:{" "}
              <span className={styles.statsValue}>
                ${user.defaultParams.money.toLocaleString()}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSticky;
