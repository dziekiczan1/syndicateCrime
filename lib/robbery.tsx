import { placeInformation } from "@/constants/sections/places";

export function calculatePlaceInformation(
  userRespect: number,
  userAddiction: number
) {
  const respectWeight = 0.5;
  const addictionWeight = 0.5;

  const placeInformationData = placeInformation.map((place) => {
    let successProbability =
      ((userRespect * respectWeight) / place.minimumRespect) * 100;

    successProbability =
      successProbability < 1 ? 0 : Math.floor(successProbability);
    successProbability = successProbability > 100 ? 100 : successProbability;

    successProbability -= userAddiction * addictionWeight;

    successProbability = successProbability < 0 ? 0 : successProbability;

    return {
      ...place,
      successProbability: Math.round(successProbability),
    };
  });

  return placeInformationData;
}

export async function fetchUpdatedStats(selectedPlace: string) {
  try {
    const response = await fetch("/api/user/stats", {
      method: "POST",
      body: JSON.stringify({
        selectedPlace,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedUser = await response.json();
      return updatedUser;
    } else {
      console.error("Error updating user stats:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating user stats:", error);
  }

  return null;
}
