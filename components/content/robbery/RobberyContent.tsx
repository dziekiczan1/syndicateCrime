import { useContext, useEffect, useRef, useState } from "react";

import { Place } from "@/constants/places";
import { fetchPlaceEnergyCosts, updateStats } from "@/lib/robbery";
import UserContext from "@/store/user-context";
import PlaceItem from "./PlaceItem";
import styles from "./RobberyContent.module.scss";
import RobberyResultInfo from "./RobberyResultInfo";

const RobberyContent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [placeEnergyCosts, setPlaceEnergyCosts] = useState<Place[]>([]);
  const [isRobberySuccessful, setIsRobberySuccessful] = useState<
    boolean | null
  >(null);
  const [receivedData, setReceivedData] = useState<any>(null);
  const [animateRobberyResult, setAnimateRobberyResult] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPlaceEnergyCostsData = async () => {
      const data = await fetchPlaceEnergyCosts(user?.defaultParams.respect);
      if (data) {
        setPlaceEnergyCosts(data);
      }
    };

    fetchPlaceEnergyCostsData();
  }, [user?.defaultParams.respect]);

  const handlePlaceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const selected = placeEnergyCosts.find((place) => place.name === value);
    setSelectedPlace(selected || null);
  };

  const handleRobbery = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedPlace) {
      try {
        const updatedUser = await updateStats(selectedPlace.name);
        if (updatedUser) {
          setIsRobberySuccessful(true);

          if (setUser) {
            setUser(updatedUser);
          }

          setReceivedData(updatedUser.lastRobbery);
          setAnimateRobberyResult(true);

          timeoutRef.current = window.setTimeout(() => {
            setIsRobberySuccessful(null);
            setAnimateRobberyResult(false);
          }, 10000);
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
        <RobberyResultInfo
          receivedData={receivedData}
          animateRobberyResult={animateRobberyResult}
        />
      )}
      <div className={styles.robberyContainer}>
        {placeEnergyCosts.map((place, index) => (
          <PlaceItem
            key={index}
            place={place}
            index={index}
            selectedPlace={selectedPlace}
            handlePlaceSelect={handlePlaceSelect}
            handleRobbery={handleRobbery}
          />
        ))}
      </div>
    </section>
  );
};

export default RobberyContent;
