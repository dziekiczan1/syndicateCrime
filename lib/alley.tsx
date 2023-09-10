import { Alley } from "@/pages/api/user/alleyActions";

export const getDefaultAlley = (): Alley => ({
  heist: false,
  escape: false,
  sabotage: false,
  university: false,
  respect: false,
  intelligence: false,
});
