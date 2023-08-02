export interface IBlackMarketActions {
  name: string;
  cost: number;
  respect: number;
}

export const blackMarketActions: IBlackMarketActions[] = [
  {
    name: "Switchblade",
    cost: 100,
    respect: 15,
  },
  {
    name: "Silenced Pistol",
    cost: 250,
    respect: 28,
  },
  {
    name: "Sawed-Off Shotgun",
    cost: 500,
    respect: 52,
  },
  {
    name: "Assault Rifle",
    cost: 1000,
    respect: 127,
  },
  {
    name: "Sniper Rifle",
    cost: 2500,
    respect: 345,
  },
  {
    name: "Grenade Launcher",
    cost: 5000,
    respect: 718,
  },
  {
    name: "C4 Explosives",
    cost: 10000,
    respect: 1439,
  },
  {
    name: "RPG Launcher",
    cost: 50000,
    respect: 7812,
  },
  {
    name: "Heavy Machine Gun",
    cost: 125000,
    respect: 16414,
  },
  {
    name: "Rocket Propelled Minigun",
    cost: 500000,
    respect: 54691,
  },
];
