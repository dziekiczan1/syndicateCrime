import {
  CreditIcon,
  HelpIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  StatsIcon,
} from "@/components/ui/icons";
import { signOut } from "next-auth/react";
import { MouseEvent } from "react";

const menuIconsStyles = { width: 24, height: 24 };

function logoutHandler(e: MouseEvent<HTMLElement>) {
  e.preventDefault();
  signOut();
}

const menuItems = [
  {
    ...menuIconsStyles,
    component: HomeIcon,
    viewBox: "360 360",
    actionName: "Home Page",
    href: "/game",
  },
  {
    ...menuIconsStyles,
    component: ProfileIcon,
    viewBox: "52 52",
    actionName: "Profile",
    href: "/menu/profile",
  },
  {
    ...menuIconsStyles,
    component: StatsIcon,
    viewBox: "52 52",
    actionName: "Statistics",
    href: "/menu/statistics",
  },
  {
    ...menuIconsStyles,
    component: CreditIcon,
    viewBox: "64 64",
    actionName: "Credit",
    href: "/menu/credit",
  },
  {
    ...menuIconsStyles,
    component: HelpIcon,
    viewBox: "46 46",
    actionName: "Help",
    href: "/menu/help",
  },
  {
    ...menuIconsStyles,
    component: LogoutIcon,
    viewBox: "512 512",
    actionName: "Logout",
    href: "/",
    onClick: logoutHandler,
  },
];
export default menuItems;
