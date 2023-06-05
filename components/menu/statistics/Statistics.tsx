import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import styles from "./Statistics.module.scss";

const Statistics: React.FC = () => {
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    try {
      if (status === "authenticated" && session) {
        const response = await fetch("/api/user/getUsers");
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
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

  return <div className={styles.container}></div>;
};

export default Statistics;
