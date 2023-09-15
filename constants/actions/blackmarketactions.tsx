export interface IBlackMarketActions {
  name: string;
  cost: number;
  respect: number;
}

export const blackMarketActions: IBlackMarketActions[] = [
  {
    name: "Brass Knuckles",
    cost: 500,
    respect: 5,
  },
  {
    name: "Peashooter",
    cost: 1000,
    respect: 10,
  },
  {
    name: "Switchblade",
    cost: 5000,
    respect: 20,
  },
  {
    name: "Silenced Pistol",
    cost: 10000,
    respect: 51,
  },
  {
    name: "Sniper Rifle",
    cost: 25000,
    respect: 287,
  },
  {
    name: "Grenade Launcher",
    cost: 50000,
    respect: 613,
  },
  {
    name: "C4 Explosives",
    cost: 100000,
    respect: 1354,
  },
  {
    name: "RPG Launcher",
    cost: 200000,
    respect: 3471,
  },
  {
    name: "Heavy Machine Gun",
    cost: 500000,
    respect: 7410,
  },
  {
    name: "Rocket Propelled Minigun",
    cost: 1500000,
    respect: 15099,
  },
];
