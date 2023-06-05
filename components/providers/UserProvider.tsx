import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

import UserContext, { IUser } from "@/store/user-context";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const contextValue = { user, setUser };
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    try {
      if (status === "authenticated" && session) {
        const response = await fetch("/api/user/getUser");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
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

  useEffect(() => {
    const socket = new w3cwebsocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    socket.onmessage = (event) => {
      const userData = JSON.parse(event.data.toString());
      setUser(userData.payload);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session && !user) {
      fetchData();
    }
  }, [status, session, user, fetchData]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
