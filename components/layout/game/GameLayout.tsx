import UserInterface from "@/components/user/interface/UserInterface";
import { ReactNode } from "react";

export interface IGameLayout {
  children?: ReactNode;
}

const GameLayout: React.FC<IGameLayout> = ({ children }) => {
  return (
    <div className="no-scrollbar relative z-1 overflow-y-scroll">
      <div className="flex p-8">
        <div className="flex w-1/2">
          <UserInterface />
        </div>
        <div className="flex justify-center w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default GameLayout;
