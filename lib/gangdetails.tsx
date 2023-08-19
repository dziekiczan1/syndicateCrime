import { IUser } from "@/store/user-context";

export const calculateParameterTotal = (
  players: IUser[],
  parameter: keyof IUser["defaultParams"]
) => {
  return players?.reduce((total, player) => {
    const parameterValue = player.defaultParams[parameter];
    if (typeof parameterValue === "number") {
      return total + parameterValue;
    }
    return total;
  }, 0);
};
