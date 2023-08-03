export interface IBlackMarketActions {
  name: string;
  cost: number;
  respect: number;
}

export const blackMarketActions: IBlackMarketActions[] = [
  {
    name: "Switchblade",
    cost: 500,
    respect: 20,
  },
  {
    name: "Silenced Pistol",
    cost: 1750,
    respect: 51,
  },
  {
    name: "Sniper Rifle",
    cost: 5000,
    respect: 287,
  },
  {
    name: "Grenade Launcher",
    cost: 9400,
    respect: 613,
  },
  {
    name: "C4 Explosives",
    cost: 17800,
    respect: 1354,
  },
  {
    name: "RPG Launcher",
    cost: 35000,
    respect: 3471,
  },
  {
    name: "Heavy Machine Gun",
    cost: 50000,
    respect: 7410,
  },
  {
    name: "Rocket Propelled Minigun",
    cost: 100000,
    respect: 15099,
  },
];
