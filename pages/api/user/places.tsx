import { placeEnergyCosts } from "@/constants/places";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
