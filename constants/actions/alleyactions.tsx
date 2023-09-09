export interface IAlleyActions {
  name: string;
  description: string;
  userValue: number;
  requiredValue: number;
}

export const alleyActions = (userStats: any): IAlleyActions[] => {
  const userUniversityLength = Object.keys(userStats.university).filter(
    (key) => userStats.university[key] === true
  ).length;

  return [
    {
      name: "Bank Heist",
      description:
        "A wealthy client needs a million dollars stashed safely in the bank's vault. Are you up for the challenge of pulling off the perfect bank heist and securing the fortune?",
      userValue: userStats?.bank || 0,
      requiredValue: 1000000,
    },
    {
      name: "Great Escape",
      description:
        "The underworld's top fugitive requires your help. Assist in engineering daring prison breaks and help them escape from the clutches of the law not once, but ten times.",
      userValue: userStats?.prison?.escapes || 0,
      requiredValue: 50,
    },
    {
      name: "Master of Sabotage",
      description:
        "Become the master of chaos by sabotaging the plans of your rivals. Your target: at least 100 individuals. The more chaos, the better your reputation in the criminal world.",
      userValue: userStats?.sabotage.totalSabotages || 0,
      requiredValue: 100,
    },
    {
      name: "Academic Excellence",
      description:
        "Show your intellectual prowess by completing all university courses. Knowledge is power, and in the world of syndicates, being well-educated can open new doors.",
      userValue: userUniversityLength || 0,
      requiredValue: 4,
    },
    {
      name: "Respect is Earned",
      description:
        "Respect is the currency of the streets. Prove your worth by earning 5,000 respect points and solidify your status as a true gangster.",
      userValue: userStats?.defaultParams.respect || 0,
      requiredValue: 5000,
    },
    {
      name: "Intellectual Savvy",
      description:
        "Intelligence is your greatest weapon. Accumulate 5,000 intelligence points through cunning strategies and astute decision-making to dominate the criminal underworld.",
      userValue: userStats?.defaultParams.intelligence || 0,
      requiredValue: 5000,
    },
  ];
};
