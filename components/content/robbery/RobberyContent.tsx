import { useContext, useEffect, useState } from "react";

import InputField from "@/components/auth/InputField";
import UserContext from "@/store/user-context";
import styles from "./RobberyContent.module.scss";

interface Place {
  name: string;
  energyCost: number;
  successProbability: number;
}

const RobberyContent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [placeEnergyCosts, setPlaceEnergyCosts] = useState<Place[]>([]);
  const [isRobberySuccessful, setIsRobberySuccessful] = useState<
    boolean | null
  >(null);
  const [receivedData, setReceivedData] = useState<any>(null);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPlaceEnergyCosts = async () => {
      try {
        const response = await fetch("/api/user/places", {
          method: "POST",
          body: JSON.stringify({ respect: user?.defaultParams.respect }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPlaceEnergyCosts(data);
        } else {
          console.error(
            "Error fetching place energy costs:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching place energy costs:", error);
      }
    };

    fetchPlaceEnergyCosts();
  }, [user?.defaultParams.respect]);

  const handlePlaceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const selected = placeEnergyCosts.find((place) => place.name === value);
    setSelectedPlace(selected || null);
  };

  const handleRobbery = async () => {
    if (selectedPlace) {
      try {
        const response = await fetch("/api/user/stats", {
          method: "POST",
          body: JSON.stringify({
            selectedPlace: selectedPlace.name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const updatedUser = await response.json();

          console.log("updatedUser", updatedUser);

          if (updatedUser.lastRobbery.robberySuccessful) {
            setIsRobberySuccessful(true);
          } else {
            setIsRobberySuccessful(false);
          }

          if (setUser) {
            setUser(updatedUser);
          }

          setReceivedData(updatedUser.lastRobbery);

          setTimeout(() => {
            setIsRobberySuccessful(null);
          }, 10000);
        } else {
          console.error("Error updating user stats:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <p>
          Experience the thrill of high-stakes robberies. Plan, execute, and
          reap the rewards as you embark on daring heists in pursuit of wealth
          and notoriety. Test your skills, outsmart security systems, and leave
          your mark as a master thief. Are you ready to step into the world of
          crime and become a legend?
        </p>
      </div>
      <div>
        {isRobberySuccessful && <p>{receivedData?.money}</p>}
        <h2>Select a place for robbery</h2>
        {placeEnergyCosts.map((place, index) => (
          <div key={index}>
            <InputField
              type="radio"
              id={`place-${index}`}
              name="selectedPlace"
              value={place.name}
              checked={selectedPlace?.name === place.name}
              onChange={handlePlaceSelect}
              checkbox
              label={place.name}
            />
            <p>Success Probability: {place.successProbability}%</p>
          </div>
        ))}
        {selectedPlace && (
          <div>
            <p>Energy Cost: {selectedPlace.energyCost}</p>
          </div>
        )}
        {selectedPlace && <button onClick={handleRobbery}>Rob</button>}
      </div>
    </section>
  );
};

export default RobberyContent;
