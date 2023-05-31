import { NextApiRequest, NextApiResponse } from "next";

interface Place {
  name: string;
  energyCost: number;
  minimumRespect: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const placeEnergyCosts: Place[] = [
    { name: "Warehouse", energyCost: 5, minimumRespect: 1 },
    { name: "Antique Store", energyCost: 8, minimumRespect: 3 },
    { name: "Hotel", energyCost: 10, minimumRespect: 5 },
    { name: "Train Station", energyCost: 12, minimumRespect: 8 },
    { name: "Art Gallery", energyCost: 15, minimumRespect: 10 },
    { name: "Penthouse", energyCost: 20, minimumRespect: 15 },
    { name: "Museum", energyCost: 25, minimumRespect: 30 },
    { name: "Mall", energyCost: 30, minimumRespect: 50 },
    { name: "Mansion", energyCost: 35, minimumRespect: 100 },
    { name: "Amusement Park", energyCost: 40, minimumRespect: 200 },
    { name: "Jewelry Store", energyCost: 40, minimumRespect: 500 },
    { name: "Diamond Exchange", energyCost: 45, minimumRespect: 1000 },
    { name: "Sports Stadium", energyCost: 45, minimumRespect: 3000 },
    { name: "Bank", energyCost: 50, minimumRespect: 5000 },
    { name: "Government Building", energyCost: 50, minimumRespect: 10000 },
    { name: "Corporate Office", energyCost: 50, minimumRespect: 12000 },
    { name: "Yacht", energyCost: 50, minimumRespect: 15000 },
    { name: "Luxury Car Dealership", energyCost: 50, minimumRespect: 15000 },
    { name: "Casino", energyCost: 50, minimumRespect: 15000 },
    { name: "Airport Vault", energyCost: 50, minimumRespect: 15000 },
  ];

  const userRespect = req.body.respect || 1;
  const updatedPlaceEnergyCosts = placeEnergyCosts.map((place) => {
    let successProbability = (userRespect / place.minimumRespect) * 100;
    successProbability =
      successProbability < 1 ? 0 : Math.floor(successProbability);
    successProbability = successProbability > 100 ? 100 : successProbability;
    return {
      ...place,
      successProbability,
    };
  });

  res.status(200).json(updatedPlaceEnergyCosts);
}
