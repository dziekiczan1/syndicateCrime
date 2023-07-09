import { Whore } from "@/pages/api/user/whoresActions";
import { createContext } from "react";

export interface IUser {
  _id: string;
  email: string;
  password?: string;
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
    charisma: number;
    money: number;
  };
  bank?: number;
  prison?: {
    isPrisoner: boolean;
    escapes: number;
    bailouts: number;
  };
  whores?: Whore[];
}

export interface IUserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>> | null;
}

const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: null,
});

export default UserContext;
