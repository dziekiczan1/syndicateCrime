export async function fetchPlaceEnergyCosts(respect: number | undefined) {
  try {
    const response = await fetch("/api/user/places", {
      method: "POST",
      body: JSON.stringify({ respect }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching place energy costs:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching place energy costs:", error);
  }

  return null;
}

export async function updateStats(selectedPlace: string) {
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
