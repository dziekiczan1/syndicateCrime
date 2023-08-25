import { useEffect, useState } from "react";

const useGangDetailsFetch = (
  gangName: string | undefined,
  sabotage?: boolean,
  respect?: number
) => {
  const [isLoadingGangDetails, setIsLoadingGangDetails] = useState(false);
  const [gangDetails, setGangDetails] = useState<any | null>(null);

  useEffect(() => {
    if (gangName) {
      setIsLoadingGangDetails(true);

      const requestBody = {
        gangName,
        sabotage,
        respect,
      };

      const fetchGangDetails = async () => {
        try {
          const response = await fetch(`/api/user/gangDetails`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setGangDetails(data);
          } else {
            console.error("Failed to fetch gang details:", response.status);
          }
        } catch (error) {
          console.error("Error fetching gang details:", error);
        } finally {
          setIsLoadingGangDetails(false);
        }
      };

      fetchGangDetails();
    }
  }, [gangName, sabotage, respect]);

  return { isLoadingGangDetails, gangDetails };
};

export default useGangDetailsFetch;
