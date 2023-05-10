import { createContext } from "react";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
  defaultParams: {
    class: string;
    morale: string;
    respect: number;
    energy: number;
    life: number;
    addiction: number;
    intelligence: number;
    strength: number;
    endurance: number;
    money: number;
  };
}

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>> | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null,
});

export default UserContext;
