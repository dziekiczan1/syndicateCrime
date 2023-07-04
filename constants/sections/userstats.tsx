import {
  CharismaIcon,
  EnduranceIcon,
  IntelligenceIcon,
  MoneyIcon,
  RespectIcon,
  StrengthIcon,
} from "@/components/ui/icons";

export const getUserStatistics = (userStats: any) => {
  const iconColor = "#666666";
  const userStatsStyles = { fill: iconColor, width: 48, height: 48 };

  return [
    {
      ...userStatsStyles,
      component: StrengthIcon,
      viewBox: "512 512",
      statsValue: userStats?.strength,
      statsName: "Strength",
      tooltipText:
        "Strength represents your physical power and ability to overpower obstacles or opponents. A higher strength level allows you to execute robberies more efficiently and handle challenging situations with ease.",
    },
    {
      ...userStatsStyles,
      component: EnduranceIcon,
      viewBox: "256 256",
      statsValue: userStats?.endurance,
      statsName: "Endurance",
      tooltipText: "lorem ipsum",
    },
    {
      ...userStatsStyles,
      component: MoneyIcon,
      viewBox: "48 48",
      statsValue: userStats?.money.toLocaleString(),
      statsName: "Money",
      tooltipText: "lorem ipsum",
    },
    {
      ...userStatsStyles,
      component: IntelligenceIcon,
      viewBox: "32 32",
      statsValue: userStats?.intelligence,
      statsName: "Intelligence",
      tooltipText: "lorem ipsum",
    },
    {
      ...userStatsStyles,
      component: CharismaIcon,
      viewBox: "512 512",
      statsValue: userStats?.charisma,
      statsName: "Charisma",
      tooltipText: "lorem ipsum",
    },
    {
      ...userStatsStyles,
      component: RespectIcon,
      viewBox: "512 512",
      statsValue: userStats?.respect,
      statsName: "Respect",
      tooltipText: "lorem ipsum",
    },
  ];
};