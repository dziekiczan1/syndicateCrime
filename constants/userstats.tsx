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
  const obj = { fill: iconColor, width: 48, height: 48 };

  return [
    {
      ...obj,
      component: StrengthIcon,
      viewBox: "512 512",
      statsValue: userStats.strength,
      statsName: "Strength",
    },
    {
      ...obj,
      component: EnduranceIcon,
      viewBox: "256 256",
      statsValue: userStats.endurance,
      statsName: "Endurance",
    },
    {
      ...obj,
      component: MoneyIcon,
      viewBox: "48 48",
      statsValue: userStats.money,
      statsName: "Money",
    },
    {
      ...obj,
      component: IntelligenceIcon,
      viewBox: "32 32",
      statsValue: userStats.intelligence,
      statsName: "Intelligence",
    },
    {
      ...obj,
      component: CharismaIcon,
      viewBox: "512 512",
      statsValue: userStats.charisma,
      statsName: "Charisma",
    },
    {
      ...obj,
      component: RespectIcon,
      viewBox: "512 512",
      statsValue: userStats.respect,
      statsName: "Respect",
    },
  ];
};
