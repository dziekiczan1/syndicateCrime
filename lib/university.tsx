import { University } from "@/pages/api/user/universityActions";

export const getDefaultUniversity = (): University => ({
  architecture: false,
  pimp: false,
  blackmarket: false,
  bank: false,
});
