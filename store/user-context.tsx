import { Alley } from "@/pages/api/user/alleyActions";
import { Weapon } from "@/pages/api/user/blackmarketActions";
import { Buildings } from "@/pages/api/user/buildingsActions";
import { Mission } from "@/pages/api/user/districtActions";
import { MarketCompany } from "@/pages/api/user/marketActions";
import { Sabotage } from "@/pages/api/user/sabotageActions";
import { University } from "@/pages/api/user/universityActions";
import { Whore } from "@/pages/api/user/whoresActions";
import { ObjectId } from "mongodb";
import { createContext } from "react";

export interface IUser {
  _id: string | ObjectId;
  email: string;
  password?: string;
  username: string;
  avatar: string;
  defaultParams: {
    class: string;
    gang?: string;
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
  weapons?: Weapon[];
  buildings?: Buildings[];
  university?: University;
  sabotage?: Sabotage;
  market?: MarketCompany[];
  alley?: Alley;
  isPlayerDead?: boolean;
  district?: Mission;
  hasSeenGuide?: boolean;
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
