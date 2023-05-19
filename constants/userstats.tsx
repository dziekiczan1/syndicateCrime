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
    },
    {
      ...userStatsStyles,
      component: EnduranceIcon,
      viewBox: "256 256",
      statsValue: userStats?.endurance,
      statsName: "Endurance",
    },
    {
      ...userStatsStyles,
      component: MoneyIcon,
      viewBox: "48 48",
      statsValue: userStats?.money,
      statsName: "Money",
    },
    {
      ...userStatsStyles,
      component: IntelligenceIcon,
      viewBox: "32 32",
      statsValue: userStats?.intelligence,
      statsName: "Intelligence",
    },
    {
      ...userStatsStyles,
      component: CharismaIcon,
      viewBox: "512 512",
      statsValue: userStats?.charisma,
      statsName: "Charisma",
    },
    {
      ...userStatsStyles,
      component: RespectIcon,
      viewBox: "512 512",
      statsValue: userStats?.respect,
      statsName: "Respect",
    },
  ];
};
