import { useState } from "react";
import styles from "./RobberyContent.module.scss";

interface Place {
  name: string;
  energyCost: number;
  successProbability: number;
}

const RobberyContent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlaceName = event.target.value;
    const place = places.find((p) => p.name === selectedPlaceName) || null;
    setSelectedPlace(place);
  };

  const places: Place[] = [
    { name: "Place 1", energyCost: 10, successProbability: 80 },
    { name: "Place 2", energyCost: 15, successProbability: 70 },
  ];

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
        <h2>Select a place for robbery</h2>
        <select value={selectedPlace?.name || ""} onChange={handlePlaceSelect}>
          <option value="">Select a place</option>
          {places.map((place, index) => (
            <option key={index} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
        {selectedPlace && (
          <div>
            <p>Energy Cost: {selectedPlace.energyCost}</p>
            <p>Success Probability: {selectedPlace.successProbability}%</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RobberyContent;
