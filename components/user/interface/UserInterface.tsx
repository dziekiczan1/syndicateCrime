import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";

import Button from "@/components/ui/button/Button";
import UserContext from "@/store/user-context";
import Avatar from "../avatar/Avatar";
import styles from "./UserInterface.module.scss";

export interface IUserInterface {
  user?: { [key: string]: any } | null;
}

const UserInterface: React.FC<IUserInterface> = () => {
  const { data: session, status } = useSession();
  const { user } = useContext(UserContext);

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
      {session && (
        <div>
          <div className={styles.avatar}>
            <Avatar
              width={180}
              height={180}
              src={user?.avatar}
              alt={user?.username}
            />
          </div>
          <p>{user?.defaultParams.strength}</p>
          <h1>Jesteś zalogowany jako {user?.username}</h1>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
