import {
  CreditIcon,
  HelpIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  StatsIcon,
} from "@/components/ui/icons";

const menuIconsStyles = { width: 24, height: 24 };

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
    href: "/profile",
  },
  {
    ...menuIconsStyles,
    component: StatsIcon,
    viewBox: "52 52",
    actionName: "Statistics",
    href: "/statistics",
  },
  {
    ...menuIconsStyles,
    component: CreditIcon,
    viewBox: "64 64",
    actionName: "Credit",
    href: "/credit",
  },
  {
    ...menuIconsStyles,
    component: HelpIcon,
    viewBox: "46 46",
    actionName: "Help",
    href: "/help",
  },
  {
    ...menuIconsStyles,
    component: LogoutIcon,
    viewBox: "512 512",
    actionName: "Logout",
    href: "/",
  },
];
export default menuItems;
