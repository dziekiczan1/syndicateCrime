import ActionsInterface from "@/components/user/actions/ActionsInterface";
import UserInterface from "@/components/user/interface/UserInterface";
import { ReactNode } from "react";
import Logo from "../logo/Logo";

export interface IGameLayout {
  children?: ReactNode;
}

const GameLayout: React.FC<IGameLayout> = ({ children }) => {
  return (
    <div className="relative z-1">
      <div className="flex p-8">
        <div className="flex flex-col gap-8 w-1/2">
          <UserInterface />
          <ActionsInterface />
        </div>
        <div className="flex justify-center w-1/2 h-fit">
          <Logo width={300} height={180} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
