import { useContext, useEffect, useState } from "react";

import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import UserContext from "@/store/user-context";
import styles from "./RobberyContent.module.scss";

interface Place {
  name: string;
  energyCost: number;
  successProbability: number;
  minPrice: number;
  maxPrice: number;
}

const RobberyContent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [placeEnergyCosts, setPlaceEnergyCosts] = useState<Place[]>([]);
  const [isRobberySuccessful, setIsRobberySuccessful] = useState<
    boolean | null
  >(null);
  const [receivedData, setReceivedData] = useState<any>(null);
  const [animateRobberyResult, setAnimateRobberyResult] = useState(false);

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

          console.log("updated", updatedUser);

          setIsRobberySuccessful(true);

          if (setUser) {
            setUser(updatedUser);
          }

          setReceivedData(updatedUser.lastRobbery);
          setAnimateRobberyResult(true);

          setTimeout(() => {
            setIsRobberySuccessful(null);
            setAnimateRobberyResult(false);
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
      <div className={styles.description}>
        <p>
          Experience the thrill of high-stakes robberies. Plan, execute, and
          reap the rewards as you embark on daring heists in pursuit of wealth
          and notoriety. Test your skills, outsmart security systems, and leave
          your mark as a master thief. Are you ready to step into the world of
          crime and become a legend?
        </p>
      </div>
      <h2 className={styles.title}>Select a place for robbery</h2>
      {isRobberySuccessful && (
        <div
          className={`${styles.robberyResultInfo} ${
            !receivedData.robberySuccessful && styles.robberryFailed
          } ${animateRobberyResult && styles.robberyResultInfoShow}`}
        >
          {receivedData.robberyMoney ? (
            <>
              <p className={styles.message}>{receivedData.message}</p>
              <p>
                You {receivedData.robberySuccessful ? "won: " : "lost: "}
                <span>${receivedData.robberyMoney}</span>
              </p>
            </>
          ) : (
            <p>{receivedData.message}</p>
          )}
        </div>
      )}
      <div className={styles.robberyContainer}>
        {placeEnergyCosts.map((place, index) => (
          <div key={index} className={styles.placeContainer}>
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
            <div className={styles.detailsContainer}>
              <div className={styles.robberyInfo}>
                <p>
                  Energy Cost: <span>{place.energyCost}</span>
                </p>
                <p>
                  Price reward:{" "}
                  <span>
                    ${place.minPrice} - ${place.maxPrice}
                  </span>
                </p>
                <p>
                  Success Probability: <span>{place.successProbability}%</span>
                </p>
              </div>
              <div className={styles.robberyAction}>
                {selectedPlace?.name === place.name && (
                  <Button onClick={handleRobbery} secondary fullSize>
                    Rob
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RobberyContent;
