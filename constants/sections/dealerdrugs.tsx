export interface DrugDetails {
  cost: number;
  energyPoints?: number;
  intelligencePoints?: number;
  charismaPoints?: number;
  strengthPoints?: number;
  endurancePoints?: number;
  respectPoints?: number;
  addictionPoints?: number;
}

export const drugDetails: { [key: string]: DrugDetails } = {
  Marijuana: {
    cost: 1000,
    intelligencePoints: 5,
    energyPoints: 10,
    addictionPoints: 5,
  },
  Heroin: {
    cost: 3000,
    strengthPoints: 10,
    energyPoints: 10,
    addictionPoints: 10,
  },
  Cocaine: {
    cost: 5000,
    charismaPoints: 20,
    energyPoints: 20,
    addictionPoints: 15,
  },
  Meth: {
    cost: 8000,
    endurancePoints: 25,
    energyPoints: 25,
    addictionPoints: 20,
  },
  LSD: {
    cost: 25000,
    respectPoints: 30,
    energyPoints: 50,
    addictionPoints: 30,
  },
};

export const drugStatNames: { [key: string]: string } = {
  cost: "Cost: ",
  energyPoints: "Energy Points: ",
  intelligencePoints: "Intelligence Points: ",
  charismaPoints: "Charisma Points: ",
  endurancePoints: "Endurance Points: ",
  strengthPoints: "Strength Points: ",
  respectPoints: "Respect Points: ",
  addictionPoints: "Addiction: ",
};
