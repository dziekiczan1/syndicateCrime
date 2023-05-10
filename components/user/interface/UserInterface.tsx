import Button from "@/components/ui/button/Button";
import { signOut, useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import styles from "./UserInterface.module.scss";

export interface IUserInterface {
  user?: {
    [key: string]: any;
  };
}

const UserInterface: React.FC<IUserInterface> = ({ user }) => {
  const { data: session, status } = useSession();

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
          <Avatar
            width={300}
            height={300}
            src={user?.avatar}
            alt={user?.username}
          />
          <h1>Jesteś zalogowany jako {user?.username}</h1>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
