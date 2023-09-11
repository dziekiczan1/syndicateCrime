import { StaticImageData } from "next/image";
import alleyImages from "../images/alley";

export interface IAlleyActions {
  short: string;
  name: string;
  imageSrc: StaticImageData;
  description: string;
  userValue: number;
  requiredValue: number;
  bonus: {
    money: number;
    statValue: number;
    stat: string;
    extra: string;
  };
}

export const alleyActions = (userStats: any): IAlleyActions[] => {
  const userUniversityLength =
    userStats &&
    Object.keys(userStats?.university).filter(
      (key) => userStats.university[key] === true
    ).length;

  return [
    {
      short: "heist",
      name: "Bank Heist",
      imageSrc: alleyImages.heist,
      description:
        "A wealthy client needs a million dollars stashed safely in the bank's vault. Are you up for the challenge of pulling off the perfect bank heist and securing the fortune?",
      userValue: userStats?.bank || 0,
      requiredValue: 1000000,
      bonus: {
        money: 100000,
        statValue: 100,
        stat: "endurance",
        extra: "1 extra building",
      },
    },
    {
      short: "escape",
      name: "Great Escape",
      imageSrc: alleyImages.escape,
      description:
        "The underworld's top fugitive requires your help. Assist in engineering daring prison breaks and help them escape from the clutches of the law not once, but ten times.",
      userValue: userStats?.prison?.escapes || 0,
      requiredValue: 50,
      bonus: {
        money: 125000,
        statValue: 250,
        stat: "charisma",
        extra: "1 extra weapon",
      },
    },
    {
      short: "sabotage",
      name: "Master of Sabotage",
      imageSrc: alleyImages.sabotage,
      description:
        "Become the master of chaos by sabotaging the plans of your rivals. Your target: at least 100 individuals. The more chaos, the better your reputation in the criminal world.",
      userValue: userStats?.sabotage.totalSabotages || 0,
      requiredValue: 100,
      bonus: {
        money: 150000,
        statValue: 350,
        stat: "respect",
        extra: "1 extra whore",
      },
    },
    {
      short: "university",
      name: "Academic Excellence",
      imageSrc: alleyImages.university,
      description:
        "Show your intellectual prowess by completing all university courses. Knowledge is power, and in the world of syndicates, being well-educated can open new doors.",
      userValue: userUniversityLength || 0,
      requiredValue: 4,
      bonus: {
        money: 200000,
        statValue: 500,
        stat: "intelligence",
        extra: "2 extra buildings",
      },
    },
    {
      short: "respect",
      name: "Respect is Earned",
      imageSrc: alleyImages.respect,
      description:
        "Respect is the currency of the streets. Prove your worth by earning 5,000 respect points and solidify your status as a true gangster.",
      userValue: userStats?.defaultParams.respect || 0,
      requiredValue: 10000,
      bonus: {
        money: 250000,
        statValue: 1000,
        stat: "respect",
        extra: "2 extra weapons",
      },
    },
    {
      short: "intelligence",
      name: "Intellectual Savvy",
      imageSrc: alleyImages.intelligence,
      description:
        "Accumulate 5,000 intelligence points through cunning strategies and astute decision-making to dominate the criminal underworld.",
      userValue: userStats?.defaultParams.intelligence || 0,
      requiredValue: 10000,
      bonus: {
        money: 250000,
        statValue: 1000,
        stat: "intelligence",
        extra: "2 extra whores",
      },
    },
  ];
};
