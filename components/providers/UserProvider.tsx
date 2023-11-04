import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

import UserContext, { IUser } from "@/store/user-context";
import { useRouter } from "next/router";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const contextValue = { user, setUser };
  const { data: session, status } = useSession();
  const router = useRouter();

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
  }, [status, session, fetchData, router.pathname]);

  useEffect(() => {
    const socket = new w3cwebsocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    socket.onopen = () => {
      if (status === "authenticated" && session && user) {
        const messageObject = { type: "init", userId: user._id };
        const messageString = JSON.stringify(messageObject);
        socket.send(JSON.stringify(messageString));
      }
    };

    socket.onmessage = (event) => {
      const userData = JSON.parse(event.data.toString());
      if (userData.type === "userUpdate") {
        setUser(userData.payload);
      }
    };

    return () => {
      socket.close();
    };
  }, [status, session, user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
