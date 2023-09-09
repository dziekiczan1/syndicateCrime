export interface IAlleyActions {
  name: string;
  description: string;
  userValue: number;
  requiredValue: number;
}

export const alleyActions = (userStats: any): IAlleyActions[] => {
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
  ];
};
