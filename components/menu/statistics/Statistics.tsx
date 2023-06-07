import Loading from "@/components/ui/loading/Loading";
import UserContext from "@/store/user-context";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Statistics.module.scss";

const Statistics: React.FC = () => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      if (status === "authenticated" && session) {
        const response = await fetch("/api/user/getUsers");
        if (response.ok) {
          const playersData = await response.json();
          setPlayers(playersData);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch user data:", response.status);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    fetchData();
  }, [status, session, fetchData]);

  const currentUserIndex = players.findIndex(
    (player) => player.email === user?.email
  );
  const isCurrentUserInTopTen = currentUserIndex >= 10;

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Unleash the power of statistics and dive into the world of competitive
          gaming. Explore rankings, leaderboards, and player standings as you
          witness the pursuit of excellence. Discover the secrets of success and
          join the elite in their quest for glory. Are you ready to embrace the
          challenge and make your mark among the top players? Step into the
          realm of statistics and let the adventure unfold.
        </p>
      </div>
      <h2 className={styles.title}>Player Rankings: Rise to the Top!</h2>
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <p>Position</p>
              </th>
              <th>
                <p>Username</p>
              </th>
              <th>
                <p>Respect</p>
              </th>
              <th>
                <p>Strength</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {players
              .sort((a, b) => b.defaultParams.respect - a.defaultParams.respect)
              .slice(0, 10)
              .map((player, index) => (
                <tr
                  key={player.username}
                  className={
                    user?.email === player.email ? styles.currentUserRow : ""
                  }
                >
                  <td>
                    <p>#{index + 1}</p>
                  </td>
                  <td>
                    <p>{player.username}</p>
                  </td>
                  <td>
                    <p>{player.defaultParams.respect}</p>
                  </td>
                  <td>
                    <p>{player.defaultParams.strength}</p>
                  </td>
                </tr>
              ))}
            {players.length > 10 && isCurrentUserInTopTen && (
              <tr className={styles.ellipsisRow}>
                <td>
                  <p>...</p>
                </td>
                <td colSpan={3}></td>
              </tr>
            )}
            {isCurrentUserInTopTen && (
              <tr className={`${styles.currentUserRow}`}>
                <td>
                  <p>#{currentUserIndex + 1}</p>
                </td>
                <td>
                  <p>{user?.username}</p>
                </td>
                <td>
                  <p>{user?.defaultParams.respect}</p>
                </td>
                <td>
                  <p>{user?.defaultParams.strength}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
