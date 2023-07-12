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
      tooltipText:
        "Endurance represents your stamina and resilience to endure physical exertion and withstand fatigue. It enhances your ability to engage in prolonged activities and recover quickly from injuries or strain.",
    },
    {
      ...userStatsStyles,
      component: MoneyIcon,
      viewBox: "48 48",
      statsValue: userStats?.money.toLocaleString(),
      statsName: "Money",
      tooltipText:
        "Money represents your financial wealth and resources in the game. It determines your purchasing power, enabling you to buy items, equipment, and properties. Accumulating more money allows you to unlock new opportunities, invest in profitable ventures, and establish a prosperous empire.",
    },
    {
      ...userStatsStyles,
      component: IntelligenceIcon,
      viewBox: "32 32",
      statsValue: userStats?.intelligence,
      statsName: "Intelligence",
      tooltipText:
        "Intelligence represents your mental acuity, problem-solving skills, and ability to process information. A higher intelligence level enhances your critical thinking, strategic planning, and decision-making capabilities.",
    },
    {
      ...userStatsStyles,
      component: CharismaIcon,
      viewBox: "512 512",
      statsValue: userStats?.charisma,
      statsName: "Charisma",
      tooltipText:
        "Charisma represents your ability to charm, persuade, and influence others. A higher charisma level enhances your social skills, charisma, and likability. It allows you to negotiate better deals, win people's trust, and build strong relationships.",
    },
    {
      ...userStatsStyles,
      component: RespectIcon,
      viewBox: "512 512",
      statsValue: userStats?.respect,
      statsName: "Respect",
      tooltipText:
        "Respect represents your reputation and influence within the game world. A higher respect level increases your success probability for robberies, as it commands fear and respect from others. It determines how easily you can recruit accomplices, gain access to restricted areas, and intimidate opponents.",
    },
  ];
};
