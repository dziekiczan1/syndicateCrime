import {
  BlackmarketIcon,
  ClubIcon,
  DealerIcon,
  GangIcon,
  LadyIcon,
  MarketIcon,
  RespectIcon,
  RobberyIcon,
  SabotageIcon,
} from "@/components/ui/icons";

const iconColor = "#666666";
const actionIconsStyles = { fill: iconColor, width: 48, height: 48 };

const userActions = [
  {
    ...actionIconsStyles,
    component: RobberyIcon,
    viewBox: "512 512",
    actionName: "Robbery",
  },
  {
    ...actionIconsStyles,
    component: GangIcon,
    viewBox: "512 512",
    actionName: "Gang",
  },
  {
    ...actionIconsStyles,
    component: ClubIcon,
    viewBox: "48 48",
    actionName: "Night club",
  },
  {
    ...actionIconsStyles,
    component: SabotageIcon,
    viewBox: "512 512",
    actionName: "Sabotage",
  },
  {
    ...actionIconsStyles,
    component: LadyIcon,
    viewBox: "48 48",
    actionName: "Whores",
  },
  {
    ...actionIconsStyles,
    component: BlackmarketIcon,
    viewBox: "512 512",
    actionName: "Black market",
  },
  {
    ...actionIconsStyles,
    component: DealerIcon,
    viewBox: "44 44",
    actionName: "Dealer",
  },
  {
    ...actionIconsStyles,
    component: MarketIcon,
    viewBox: "1024 1024",
    actionName: "Market",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Buildings",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Districts",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Alley",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "University",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Hospital",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Bank",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Casino",
  },
  {
    ...actionIconsStyles,
    component: RespectIcon,
    viewBox: "512 512",
    actionName: "Prison",
  },
];
export default userActions;
