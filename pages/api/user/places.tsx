import { NextApiRequest, NextApiResponse } from "next";

interface Place {
  name: string;
  energyCost: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const placeEnergyCosts: Place[] = [
    { name: "Warehouse", energyCost: 5 },
    { name: "Antique Store", energyCost: 8 },
    { name: "Hotel", energyCost: 10 },
    { name: "Train Station", energyCost: 12 },
    { name: "Art Gallery", energyCost: 15 },
    { name: "Penthouse", energyCost: 20 },
    { name: "Museum", energyCost: 25 },
    { name: "Mall", energyCost: 30 },
    { name: "Mansion", energyCost: 35 },
    { name: "Amusement Park", energyCost: 40 },
    { name: "Jewelry Store", energyCost: 40 },
    { name: "Diamond Exchange", energyCost: 45 },
    { name: "Sports Stadium", energyCost: 45 },
    { name: "Bank", energyCost: 50 },
    { name: "Government Building", energyCost: 50 },
    { name: "Corporate Office", energyCost: 50 },
    { name: "Yacht", energyCost: 50 },
    { name: "Luxury Car Dealership", energyCost: 50 },
    { name: "Casino", energyCost: 50 },
    { name: "Airport Vault", energyCost: 50 },
  ];

  res.status(200).json(placeEnergyCosts);
}
