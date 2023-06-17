export interface DrugDetails {
  cost: number;
  energyPoints?: number;
  charismaPoints?: number;
  strengthPoints?: number;
  endurancePoints?: number;
}

export const drugDetails: { [key: string]: DrugDetails } = {
  Marijuana: { cost: 20, energyPoints: 10 },
  Cocaine: { cost: 50, charismaPoints: 20 },
  Heroin: { cost: 30, strengthPoints: 15, energyPoints: 10 },
  Meth: { cost: 100, energyPoints: 30 },
  LSD: { cost: 935, energyPoints: 5, endurancePoints: 10 },
};

export const drugStatNames: { [key: string]: string } = {
  cost: "Cost: ",
  energyPoints: "Energy Points: ",
  charismaPoints: "Charisma Points: ",
  endurancePoints: "Endurance Points: ",
  strengthPoints: "Strength Points: ",
};
