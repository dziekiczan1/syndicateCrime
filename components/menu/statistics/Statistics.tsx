import UserContext from "@/store/user-context";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Statistics.module.scss";

const Statistics: React.FC = () => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);
  const [players, setPlayers] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      if (status === "authenticated" && session) {
        const response = await fetch("/api/user/getUsers");
        if (response.ok) {
          const playersData = await response.json();
          setPlayers(playersData);
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [status, session]);

  useEffect(() => {
    fetchData();
  }, [status, session, fetchData]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>User Respect</th>
            <th>User Strength</th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort((a, b) => b.userRespect - a.userRespect)
            .slice(0, 10)
            .map((player, index) => (
              <tr
                key={player.username}
                className={
                  session?.user?.email === player.email
                    ? styles.currentUserRow
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.defaultParams.respect}</td>
                <td>{player.defaultParams.strength}</td>
              </tr>
            ))}
          {players.length > 10 && (
            <tr className={styles.ellipsisRow}>
              <td>...</td>
              <td colSpan={3}></td>
            </tr>
          )}
          {players.findIndex((player) => player.email === user?.email) >=
            10 && (
            <tr
              className={
                players.findIndex((player) => player.email === user?.email)
                  ? styles.currentUserRow
                  : ""
              }
            >
              <td>
                {players.findIndex((player) => player.email === user?.email) +
                  1}
              </td>
              <td>{session?.user?.name}</td>
              <td>
                {
                  players.find((player) => player.email === user?.email)
                    ?.defaultParams.userRespect
                }
              </td>
              <td>
                {
                  players.find((player) => player.email === user?.email)
                    ?.defaultParams.userStrength
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
