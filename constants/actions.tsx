import {
  AlleyIcon,
  BankIcon,
  BlackmarketIcon,
  BuildingsIcon,
  CasinoIcon,
  ClubIcon,
  DealerIcon,
  DistrictsIcon,
  GangIcon,
  HospitalIcon,
  LadyIcon,
  MarketIcon,
  PrisonIcon,
  RobberyIcon,
  SabotageIcon,
  UniversityIcon,
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
    component: BuildingsIcon,
    viewBox: "54 54",
    actionName: "Buildings",
  },
  {
    ...actionIconsStyles,
    component: DistrictsIcon,
    viewBox: "512 512",
    actionName: "Districts",
  },
  {
    ...actionIconsStyles,
    component: AlleyIcon,
    viewBox: "420 420",
    actionName: "Alley",
  },
  {
    ...actionIconsStyles,
    component: UniversityIcon,
    viewBox: "481 481",
    actionName: "University",
  },
  {
    ...actionIconsStyles,
    component: HospitalIcon,
    viewBox: "512 512",
    actionName: "Hospital",
  },
  {
    ...actionIconsStyles,
    component: BankIcon,
    viewBox: "64 64",
    actionName: "Bank",
  },
  {
    ...actionIconsStyles,
    component: CasinoIcon,
    viewBox: "33 33",
    actionName: "Casino",
  },
  {
    ...actionIconsStyles,
    component: PrisonIcon,
    viewBox: "14 14",
    actionName: "Prison",
  },
];
export default userActions;
